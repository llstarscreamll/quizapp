import { from } from "rxjs";
import { auth } from "firebase/app";
import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { tap, switchMap } from "rxjs/operators";

@Injectable()
export class AuthService {
  public constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  public authenticationState(): Observable<any> {
    return this.afAuth.authState;
  }

  public loginWithGoogle(): Observable<any> {
    return from(
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    ).pipe(
      switchMap(authenticationResponse =>
        this.userService.create(authenticationResponse.user)
      )
    );
  }

  public logout() {
    this.afAuth.auth.signOut();
  }
}
