import { createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const authSelector = createFeatureSelector<AuthState>('auth');