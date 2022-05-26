import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AxiosError} from 'axios'

import {authAPI, AuthUserType, LoginUserType} from '../../api/authAPI'
import {handleAsyncNetworkError, handleAsyncServerAppError, ThunkErrorType} from '../../utils/error-utils'
import {securityAPI} from '../../api/securityAPI'
import {ResultCodeEnum, ResultCodeRequireCaptchaEnum} from '../../api/instanceAPI'

import {Nullable} from '../../types/Nullable'

import {PhotosType, profileAPI} from '../../api/profileAPI'

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
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const {data} = await authAPI.me()
            if (data.resultCode === ResultCodeEnum.Success) {
                thunkAPI.dispatch(setAppStatus({status: 'successful'}))
                thunkAPI.dispatch(getMyPhoto(data.data.id))
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

export const getMyPhoto = createAsyncThunk<{ userId: number }, number, ThunkErrorType>('auth/getMyPhoto',
    async (userId, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        try {
            const res = await profileAPI.getProfileUser(userId)
            thunkAPI.dispatch(setMyPhoto({myPhoto: res.data.photos}))
        } catch (err) {
            return handleAsyncNetworkError(err as AxiosError, thunkAPI)
        }
    })

export type InitialAuthStateType = typeof initialState
