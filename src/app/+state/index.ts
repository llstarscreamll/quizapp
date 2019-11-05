import * as fromRouter from "@ngrx/router-store";
import { AuthState, AUTH_FEATURE_KEY, authReducer } from "./auth.reducer";
import { InjectionToken } from "@angular/core";
import {
  Action,
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";
import { environment } from "src/environments/environment";

export interface State {
  [AUTH_FEATURE_KEY]: AuthState;
  router: fromRouter.RouterReducerState<any>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>("Root reducers token", {
  factory: () => ({
    [AUTH_FEATURE_KEY]: authReducer,
    router: fromRouter.routerReducer
  })
});

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log("prev state", state);
    console.log("action", action);
    console.log("next state", result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
