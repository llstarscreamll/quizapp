import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  CheckIfAuthenticated = "[Auth] check if authenticated",
  LoginWithGoogle = "[Auth] login with Google",
  LoginSuccess = "[Auth] login success",
  LoginError = "[Auth] login error",
  GetAuthUser = "[Auth] get user",
  GetAuthUserSuccess = "[Auth] get user success",
  GetAuthUserError = "[Auth] get user error",
  Logout = "[Auth] logout",
  LogoutSuccess = "[Auth] logout success",
  CleanErrors = "[Auth] clean errors"
}

export class CheckIfUserIsAuthenticated {
  public readonly type = AuthActionTypes.CheckIfAuthenticated;
  public constructor() {}
}

export class LoginWithGoogle implements Action {
  public readonly type = AuthActionTypes.LoginWithGoogle;
  public constructor(public payload: any = null) {}
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;
  public constructor(public payload: any) {}
}

export class LoginError implements Action {
  public readonly type = AuthActionTypes.LoginError;
  public constructor(public payload: any) {}
}

export class GetAuthUser implements Action {
  public readonly type = AuthActionTypes.GetAuthUser;
  public constructor() {}
}

export class GetAuthUserSuccess implements Action {
  public readonly type = AuthActionTypes.GetAuthUserSuccess;
  public constructor(public payload: any) {}
}

export class GetAuthUserError implements Action {
  public readonly type = AuthActionTypes.GetAuthUserError;
  public constructor(public payload: any) {}
}

export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;
  public constructor() {}
}

export class LogoutSuccess implements Action {
  public readonly type = AuthActionTypes.LogoutSuccess;
  public constructor() {}
}

export class CleanErrors implements Action {
  public readonly type = AuthActionTypes.CleanErrors;
  public constructor() {}
}

export type AuthAction =
  | LoginWithGoogle
  | LoginSuccess
  | LoginError
  | GetAuthUser
  | GetAuthUserSuccess
  | GetAuthUserError
  | Logout
  | LogoutSuccess
  | CleanErrors;

export const fromAuthActions = {
  LoginWithGoogle,
  LoginSuccess,
  LoginError,
  GetAuthUser,
  GetAuthUserSuccess,
  GetAuthUserError,
  Logout,
  LogoutSuccess,
  CleanErrors
};
