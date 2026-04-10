import { createFeatureSelector } from "@ngrx/store";
import { UserState } from "./users.reducer";

export const usersSelector = createFeatureSelector<UserState>('users');