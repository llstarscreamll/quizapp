import { map } from "rxjs/operators";
import { Observable, from } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentSnapshot } from "@angular/fire/firestore";

import { User } from "../models/user";

@Injectable()
export class UserService {
  public constructor(private db: AngularFirestore) {}

  public create(user): Observable<any> {
    return from(
      this.db.doc(`users/${user.uid}`).set(user, { merge: true })
    ).pipe(map(_ => user));
  }

  public get(uid: string): Observable<User> {
    return this.db
      .doc(`users/${uid}`)
      .get({ source: "server" })
      .pipe(map((ref: DocumentSnapshot<User>) => ref.data()));
  }
}
