import { createSelector } from "@ngrx/store";

import { Role } from "../enums/role";
import { AuthStatus } from "../enums/auth-status";
import { AuthState, AUTH_FEATURE_KEY } from "./auth.reducer";

export const selectAuthStatue = (state: AuthState) => state[AUTH_FEATURE_KEY];
export const selectUser = createSelector(
  selectAuthStatue,
  (state: AuthState) => state.user
);
export const selectStatus = createSelector(
  selectAuthStatue,
  (state: AuthState) => state.status
);
export const selectIsLoggedIn = createSelector(
  selectAuthStatue,
  (state: AuthState) => state.status === AuthStatus.loggedIn
);
export const selectIsAdmin = createSelector(
  selectAuthStatue,
  (state: AuthState) => state.user && state.user.role === Role.admin
);
