import { from, of } from "rxjs";
import { Observable } from "rxjs";
import { auth } from "firebase/app";
import { Injectable } from "@angular/core";
import { distinctUntilChanged, map, tap } from "rxjs/operators";

import { UserService } from "./user.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {
  public constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  public authenticationState(): Observable<any> {
    return this.afAuth.authState.pipe(
      distinctUntilChanged(),
      map(this.mapAuthenticationResponse)
    );
  }

  public loginWithGoogle(): Observable<any> {
    return from(
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      map(authResponse => (authResponse ? authResponse.user : null)),
      map(this.mapAuthenticationResponse),
      tap(user => this.userService.create(user))
    );
  }

  private mapAuthenticationResponse(response) {
    return response
      ? {
          uid: response.uid,
          email: response.email,
          fullName: response.displayName,
          photoURL: response.photoURL,
          phoneNumber: response.phoneNumber,
          emailVerified: response.emailVerified
        }
      : null;
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
