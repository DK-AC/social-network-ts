import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {authAPI, AuthUserType, LoginUserType, PhotosType, profileAPI, securityAPI} from '../../api'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {Nullable} from '../../types'
import {ResultCode, ResultCodeRequireCaptcha} from '../../enum'

import {setAppError, setAppStatus} from './appReducer'

const initialState = {
    isAuth: false,
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

export const {setMyPhoto} = authSlices.actions
export const authReducer = authSlices.reducer

export const authMe = createAsyncThunk<AuthUserType, void, ThunkErrorType>
('auth/authMe',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.me()
            if (data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'successful'}))
                dispatch(getMyPhoto(data.data.id))
                return data.data
            } else {
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const login = createAsyncThunk<{ user: LoginUserType }, LoginUserType, ThunkErrorType>
('auth/login',
    async (loginData, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.login(loginData)
            if (data.resultCode === ResultCode.Success) {
                await dispatch(authMe())
                dispatch(setAppStatus({status: 'successful'}))
                dispatch(setAppError({error: null}))
                return data
            } else {
                if (data.resultCode === ResultCodeRequireCaptcha.Captcha) {
                    dispatch(getCaptchaURL())
                    dispatch(setAppError({error: null}))
                }
                return handleAsyncServerAppError(data, {dispatch, rejectWithValue})
            }
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const logout = createAsyncThunk<undefined, void, ThunkErrorType>
('auth/logout',
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.logout()
            if (data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'successful'}))
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
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await securityAPI.getCaptchaUrl()
            dispatch(setAppStatus({status: 'successful'}))
            return {url: data.url}
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export const getMyPhoto = createAsyncThunk<{ userId: number }, number, ThunkErrorType>('auth/getMyPhoto',
    async (userId, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await profileAPI.getProfileUser(userId)
            dispatch(setMyPhoto({myPhoto: res.data.photos}))
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, {dispatch, rejectWithValue})
        }
    })

export type InitialAuthStateType = typeof initialState
