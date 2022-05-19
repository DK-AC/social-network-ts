import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {authAPI, AuthUserType, LoginUserType} from '../../api/authAPI'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {securityAPI} from '../../api/securityAPI'
import {ResultCodeEnum, ResultCodeRequireCaptchaEnum} from '../../api/instanceAPI'

import {setAppError, setAppStatus} from './appReducer'

const initialState = {
    isAuth: false,
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    password: null as string | null,
    captchaURL: null as string | null,
}

export const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authMe.fulfilled, (state: InitialAuthStateType, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = true
        })
        builder.addCase(logout.fulfilled, (state: InitialAuthStateType) => {
            state.email = null
            state.password = null
            state.isAuth = false
            state.login = null
            state.captchaURL = null
            state.id = null
        })
        builder.addCase(getCaptchaURL.fulfilled, (state: InitialAuthStateType, action) => {
            state.captchaURL = action.payload.url
        })
    },
})

export const authReducer = authSlices.reducer

export const authMe = createAsyncThunk<AuthUserType, void, ThunkErrorType>
('auth/authMe',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.me()
            if (data.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                return data.data
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const login = createAsyncThunk<{ user: LoginUserType }, LoginUserType, ThunkErrorType>
('auth/login',
    async (loginData, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.login(loginData)
            if (data.resultCode === ResultCodeEnum.Success) {
                await thunkAPI.dispatch(authMe())
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                thunkAPI.dispatch(setAppError({error: ''}))
                return data
            } else {
                if (data.resultCode === ResultCodeRequireCaptchaEnum.Captcha) {
                    thunkAPI.dispatch(getCaptchaURL())
                    thunkAPI.dispatch(setAppError({error: ''}))
                }
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const logout = createAsyncThunk<undefined, void, ThunkErrorType>
('auth/logout',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.logout()
            if (data.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            } else {
                return handleAsyncServerAppError(data, thunkAPI)
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })
export const getCaptchaURL = createAsyncThunk<{ url: string }, void, ThunkErrorType>
('auth/captcha',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await securityAPI.getCaptchaUrl()
            thunkAPI.dispatch(setAppStatus({status: 'successful'}))
            return {url: data.url}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })

export type InitialAuthStateType = typeof initialState
