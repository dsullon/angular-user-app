import { createAction, props } from "@ngrx/store";

export const login = createAction('[Auth] login', props<{username: string, password: string}>());
export const loginSuccess = createAction('[Auth] loginSuccess', props<{login: any}>());
export const loginError = createAction('[Auth] loginError', props<{error: string}>());
export const logout = createAction('[Auth] logout')