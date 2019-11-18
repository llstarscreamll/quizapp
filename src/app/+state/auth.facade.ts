import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { LoginWithGoogle } from "./auth.actions";
import {
  selectStatus,
  selectUser,
  selectIsAdmin,
  selectIsLoggedIn
} from "./auth-selectors";

@Injectable({ providedIn: "root" })
export class AuthFacade {
  public user$ = this.store.select(selectUser);
  public status$ = this.store.select(selectStatus);
  public isAdmin$ = this.store.select(selectIsAdmin);
  public isLoggedIn$ = this.store.select(selectIsLoggedIn);

  public constructor(private store: Store<any>) {}

  public loginWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }
}
