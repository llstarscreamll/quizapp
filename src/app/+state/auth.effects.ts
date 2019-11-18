import { from, defer, of } from "rxjs";
import { Injectable } from "@angular/core";
import { switchMap, map, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";

import {
  AuthActionTypes,
  LoginSuccess,
  LoginError,
  CheckAuth,
  CheckAuthSuccess,
  CheckAuthError
} from "./auth.actions";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  @Effect()
  public checkIfUserIsAuthenticated$ = this.actions$.pipe(
    ofType(AuthActionTypes.CheckAuth),
    switchMap(_ =>
      this.authService
        .authenticationState()
        .pipe(
          switchMap(authResponse =>
            authResponse
              ? this.userService
                  .get(authResponse.uid)
                  .pipe(map(user => new CheckAuthSuccess(user)))
              : of(
                  new CheckAuthError({ message: "You are not authenticated!" })
                )
          )
        )
    )
  );

  @Effect()
  public loginWithGoogle$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginWithGoogle),
    switchMap(() =>
      this.authService
        .loginWithGoogle()
        .pipe(
          switchMap(authResponse =>
            authResponse
              ? this.userService
                  .get(authResponse.uid)
                  .pipe(map(user => new LoginSuccess(user)))
              : of(new LoginError({ message: "Error authenticating user!" }))
          )
        )
    )
  );

  @Effect()
  init$ = defer(() => from([new CheckAuth()]));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
