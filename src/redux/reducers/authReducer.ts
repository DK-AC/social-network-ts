import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {authAPI} from '../../api/authAPI';
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils';
import {securityAPI} from '../../api/securityAPI';
import {AuthUserType, LoginUserType} from '../../api/typesAPI';

import {setAppStatus} from './appReducer';

const initialState = {
    isAuth: false,
    id: 19179,
    login: null as string | null,
    email: null as string | null,
    password: null as string | null,
    captchaURL: null as string | null,
};

export const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authMeTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = true
        })
        builder.addCase(loginTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.email = action.meta.arg.email
            state.password = action.meta.arg.password
            state.isAuth = true
        })
        builder.addCase(logoutTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.email = null
            state.password = null
            state.isAuth = false
            state.login = null
            state.captchaURL = null
        })
        builder.addCase(getCaptchaURLTC.fulfilled, (state: InitialAuthStateType, action) => {
            state.captchaURL = action.payload.url
        })
    },
})

export const authReducer = authSlices.reducer

export const authMeTC = createAsyncThunk<AuthUserType, void, ThunkErrorType>('auth/authMe', async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const {data} = await authAPI.me()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
            return data.data
        } else {
            return handleAsyncServerAppError(data, thunkAPI)
        }
    } catch (err) {
        return handleAsyncNetworkError(err as AxiosError, thunkAPI)
    }
})
export const loginTC = createAsyncThunk<{ user: LoginUserType }, LoginUserType, ThunkErrorType>('auth/login', async (loginData, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const {data} = await authAPI.login(loginData)
        if (data.resultCode === 0) {
            await thunkAPI.dispatch(authMeTC())
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return data
        } else {
            if (data.resultCode === 10) {
                getCaptchaURLTC()
            }
            return handleAsyncServerAppError(data, thunkAPI)
        }
    } catch (err) {
        return handleAsyncNetworkError(err as AxiosError, thunkAPI)
    }
})
export const logoutTC = createAsyncThunk<undefined, void, ThunkErrorType>('auth/logout', async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const {data} = await authAPI.logout()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'successful'}));
        } else {
            return handleAsyncServerAppError(data, thunkAPI)
        }
    } catch (err) {
        return handleAsyncNetworkError(err as AxiosError, thunkAPI)
    }
})
export const getCaptchaURLTC = createAsyncThunk<{ url: string }, void, ThunkErrorType>('auth/captcha', async (_, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}));
    try {
        const {data} = await securityAPI.getCaptchaUrl()
        thunkAPI.dispatch(setAppStatus({status: 'successful'}));
        return {url: data.url}
    } catch (err) {
        return handleAsyncNetworkError(err as AxiosError, thunkAPI)
    }
})

export type InitialAuthStateType = typeof initialState
