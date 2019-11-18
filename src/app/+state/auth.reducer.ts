import { AuthAction, AuthActionTypes } from "./auth.actions";
import { AuthStatus } from "../enums/auth-status";

export const AUTH_FEATURE_KEY = "AUTH";

export interface AuthState {
  user: any;
  status: AuthStatus;
  errors?: any;
}

export const initialState: AuthState = {
  user: null,
  status: null
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case (AuthActionTypes.LoginSuccess, AuthActionTypes.CheckAuthSuccess): {
      state = {
        ...state,
        user: action.payload,
        status: AuthStatus.loggedIn
      };
      break;
    }

    case AuthActionTypes.LoginError: {
      state = {
        ...state,
        status: AuthStatus.loginError,
        errors: action.payload
      };
      break;
    }

    case AuthActionTypes.GetAuthUserSuccess: {
      state = { ...state, user: action.payload };
      break;
    }

    case AuthActionTypes.Logout: {
      state = { ...state, status: AuthStatus.loggingOut };
      break;
    }

    case AuthActionTypes.LogoutSuccess: {
      state = initialState;
      break;
    }

    case AuthActionTypes.CleanErrors: {
      state = { ...state, status: null, errors: null };
      break;
    }
  }

  return state;
}
