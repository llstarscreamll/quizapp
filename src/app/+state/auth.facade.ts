import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { LoginWithGoogle } from "./auth.actions";

@Injectable({ providedIn: "root" })
export class AuthFacade {
  public constructor(private store: Store<any>) {}

  public loginWithGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }
}
