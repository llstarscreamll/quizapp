import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class UserService {
  public constructor(private db: AngularFirestore) {}

  public create(user): Observable<any> {
    const userData = {
      uid: user.uid,
      fullName: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber
    };

    return from(
      this.db
        .doc(`users/${user.uid}`)
        .set(userData, { merge: true })
        .then(_ => userData)
    );
  }
}
