import { createReducer, on } from "@ngrx/store"
import { login, loginSuccess, logout } from "./auth.actions"

export interface AuthState {
    isAuth: boolean,
    isAdmin: boolean,
    user: any
}

export const initialLogin: AuthState = {
    isAuth: false,
    isAdmin: false,
    user: undefined
}

const initialState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify(initialLogin))


export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, {login}) => (
        {
            isAuth: true,
            isAdmin: login.isAdmin,
            user: login.user
        }
    )),
    on(logout, (state) => ({ ...initialLogin }))
)