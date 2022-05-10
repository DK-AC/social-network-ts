import {Dispatch} from 'redux';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {authAPI, AuthUserType, LoginUserType, ResponseType} from '../../api/authAPI';
import {handleAsyncNetworkError, handleAsyncServerAppError} from '../../utils/error-utils';

import {isAppInitialized, setAppStatus} from './appReducer';
import {ThunkErrorType} from './profileReducer';

const SET_IS_INITIALIZED = 'social-network/auth/SET_IS_INITIALIZED';
const SET_IS_AUTH_USER = 'social-network/auth/SET_IS_AUTH_USER';
const CLEAR_AUTH_STATE = 'social-network/auth/CLEAR_AUTH_STATE';

const initialState = {
    isAuth: false,
    id: 19179,
    login: '',
    email: '',
    password: '',
};

export const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(authMeTC.fulfilled, (state: InitialAuthStateType, action) => {
        //     state.id = action.payload.id
        //     state.email = action.payload.email
        //     state.login = action.payload.login
        //
        // })
        builder.addCase(loginTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.email = action.payload!.email
            state.password = action.payload!.password
            state.isAuth = true
        })
        builder.addCase(logoutTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.email = ''
            state.password = ''
            state.isAuth = false
            state.login = ''
        })
    },
})

export const authReducer_ = authSlices.reducer

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
        default:
            return state;
    }
};

//actions
export const setIsInitializedAC = () => ({type: SET_IS_INITIALIZED}) as const;
export const setIsAuthUser = (data: AuthUserType) => ({type: SET_IS_AUTH_USER, data}) as const;
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
export const loginTC = createAsyncThunk<LoginUserType, LoginUserType, ThunkErrorType>('auth/login', async (data, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await authAPI.login(data)
        if (response.data.resultCode === 0) {
            await thunkAPI.dispatch(authMeTC())
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return response.data.data
        } else {
            thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})
export const logoutTC = createAsyncThunk<ResponseType, void, ThunkErrorType>('auth/logout', async (a, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            thunkAPI.dispatch(clearAuthStateAC());
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
        } else {
            thunkAPI.dispatch(setAppStatus({status: 'failed'}));
            return handleAsyncServerAppError(response.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncNetworkError(err, thunkAPI)
    }
})

//types
export type InitialAuthStateType = typeof initialState

export type AuthActionsType =
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setIsAuthUser>
    | ReturnType<typeof clearAuthStateAC>
