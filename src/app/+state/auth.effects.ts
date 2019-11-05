import { Injectable } from "@angular/core";
import { switchMap, map, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";

import {
  AuthActionTypes,
  LoginSuccess,
  LoginError,
  CheckIfUserIsAuthenticated
} from "./auth.actions";
import { AuthService } from "../services/auth.service";
import { from, defer } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: "root" })
export class AuthEffects {
  @Effect()
  public checkIfUserIsAuthenticated$ = this.actions$.pipe(
    ofType(AuthActionTypes.CheckIfAuthenticated),
    switchMap(_ =>
      this.authService.authenticationState().pipe(
        tap(console.warn),
        map(authenticatorResponse =>
          authenticatorResponse
            ? new LoginSuccess({
                ...authenticatorResponse,
                fullName: authenticatorResponse.displayName
              })
            : []
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
          map(authResponse =>
            authResponse.uid
              ? new LoginSuccess(authResponse)
              : new LoginError({ message: "Error authenticating user!" })
          )
        )
    )
  );

  @Effect()
  init$ = defer(() => from([new CheckIfUserIsAuthenticated()]));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService
  ) {}
}
