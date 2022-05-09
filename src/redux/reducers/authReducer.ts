import {Dispatch} from 'redux';

import {authAPI, AuthUserType, LoginUserType} from '../../api/authAPI';

import {isAppInitialized, setAppError, setAppStatus} from './appReducer';

const SET_IS_INITIALIZED = 'social-network/auth/SET_IS_INITIALIZED';
const SET_IS_AUTH_USER = 'social-network/auth/SET_IS_AUTH_USER';
const SET_IS_LOGGED_IN = 'social-network/auth/SET_IS_LOGGED_IN';
const CLEAR_AUTH_STATE = 'social-network/auth/CLEAR_AUTH_STATE';

const initialState = {
    isAuth: false,
    id: 19179,
    login: '',
    email: '',
    password: '',
};

console.log('next refactoring')
console.log('next refactoring')
console.log('need refactoring all reducers')

export const authReducer = (state = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case SET_IS_INITIALIZED:
            return {
                ...state, isAuth: true,
            }
        case SET_IS_AUTH_USER: {
            return {
                ...state,
                ...action.data,
            }
        }
        case SET_IS_LOGGED_IN:
            return {
                ...state,
                email: action.data.email,
                password: action.data.password,
            }
        case CLEAR_AUTH_STATE:
            return {
                login: '',
                email: '',
                id: 19179,
                password: '',
                isAuth: false,
            }
        default:
            return state;
    }
};

//actions
export const setIsInitializedAC = () => ({type: SET_IS_INITIALIZED}) as const;
export const setIsAuthUser = (data: AuthUserType) => ({type: SET_IS_AUTH_USER, data}) as const;
export const setIsLoggedInAC = (data: LoginUserType) => ({type: SET_IS_LOGGED_IN, data}) as const;
export const clearAuthStateAC = () => ({type: CLEAR_AUTH_STATE}) as const

//thunks
export const authMeTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        dispatch(setIsAuthUser(response.data.data));
        dispatch(setIsInitializedAC());
        dispatch(isAppInitialized({isInitialized: true}))
        dispatch(setAppStatus({status: 'successful'}));
    } else {
        dispatch(setAppStatus({status: 'failed'}));
    }
}
export const loginTC = (data: LoginUserType) => async (dispatch: Dispatch<any>) => {
    dispatch(setAppStatus({status: 'loading'}));
    const response = await authAPI.login(data)
    if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(response.data.data));
        dispatch(authMeTC())
        dispatch(setAppStatus({status: 'successful'}));
    } else {
        dispatch(setAppError({error: response.data.messages[0]}))
        dispatch(setAppStatus({status: 'failed'}));
    }
};
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(clearAuthStateAC());
        dispatch(setAppStatus({status: 'successful'}));
    } else {
        dispatch(setAppStatus({status: 'failed'}));
    }
};

//types
export type InitialAuthStateType = typeof initialState

export type AuthActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setIsAuthUser>
    | ReturnType<typeof clearAuthStateAC>
