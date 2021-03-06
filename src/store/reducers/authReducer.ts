import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {authAPI, AuthUserType, LoginUserType, profileAPI, securityAPI} from '../../api'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {Nullable, PhotosType} from '../../types'
import {ResultCode, ResultCodeRequireCaptcha} from '../../enum'
import {FAILED_USER_AUTH, SUCCESS_USER_AUTH} from '../../constans'

import {setAppError, setAppStatus} from './appReducer'

const initialState = {
    isAuth: FAILED_USER_AUTH,
    id: null as Nullable<number>,
    login: null as Nullable<string>,
    email: null as Nullable<string>,
    password: null as Nullable<string>,
    captchaURL: null as Nullable<string>,
    myPhotos: null as Nullable<PhotosType>,
}

export const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMyPhoto(state: InitialAuthStateType, action: PayloadAction<{ myPhoto: Nullable<PhotosType> }>) {
            state.myPhotos = action.payload.myPhoto
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authMe.fulfilled, (state: InitialAuthStateType, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = SUCCESS_USER_AUTH
        })
        builder.addCase(logout.fulfilled, (state: InitialAuthStateType) => {
            state.email = null
            state.password = null
            state.isAuth = FAILED_USER_AUTH
            state.login = null
            state.captchaURL = null
            state.id = null
        })
        builder.addCase(getCaptchaURL.fulfilled, (state: InitialAuthStateType, action) => {
            state.captchaURL = action.payload.url
        })
    },
})

export const {setMyPhoto} = authSlices.actions
export const authReducer = authSlices.reducer

export const authMe = createAsyncThunk<AuthUserType, void, ThunkErrorType>
('auth/authMe',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await authAPI.me()
            const {resultCode} = data

            if (resultCode === ResultCode.Success) {
                dispatch(setAppStatus({appStatus: 'successful'}))
                dispatch(getMyPhoto(data.data.id))
                return data.data
            }
            return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const login = createAsyncThunk<{ user: LoginUserType }, LoginUserType, ThunkErrorType>
('auth/login',
    async (loginData, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await authAPI.login(loginData)
            const {resultCode, messages} = data

            if (resultCode === ResultCode.Success) {
                await dispatch(authMe())
                dispatch(setAppStatus({appStatus: 'successful'}))
                dispatch(setAppError({error: null}))
                return data
            }

            if (resultCode === ResultCode.Error) {
                dispatch(setAppStatus({appStatus: 'failed'}))
                dispatch(setAppError({error: messages[0]}))
            }

            if (data.resultCode === ResultCodeRequireCaptcha.Captcha) {
                dispatch(getCaptchaURL())
                dispatch(setAppError({error: null}))
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }

        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const logout = createAsyncThunk<undefined, void, ThunkErrorType>
('auth/logout',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await authAPI.logout()
            const {resultCode} = data

            if (resultCode === ResultCode.Success) {
                dispatch(setAppStatus({appStatus: 'successful'}))
            } else {
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const getCaptchaURL = createAsyncThunk<{ url: string }, void, ThunkErrorType>
('auth/captcha',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await securityAPI.getCaptchaUrl()
            const {url} = data

            dispatch(setAppStatus({appStatus: 'successful'}))
            return {url}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const getMyPhoto = createAsyncThunk<{ userId: number }, number, ThunkErrorType>('auth/getMyPhoto',
    async (userId, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({appStatus: 'loading'}))
        try {
            const {data} = await profileAPI.getProfileUser(userId)
            const {photos} = data

            dispatch(setMyPhoto({myPhoto: photos}))
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export type InitialAuthStateType = typeof initialState
