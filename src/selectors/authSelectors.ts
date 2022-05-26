import {RootStateType} from '../redux/store'

export const getIsAuth = (state: RootStateType) => state.auth.isAuth

export const getCurrentUserId = (state: RootStateType) => state.auth.id

export const getCurrentUserLogin = (state: RootStateType) => state.auth.login

export const getCurrentUserEmail = (state: RootStateType) => state.auth.email

export const getCaptchaUrl = (state: RootStateType) => state.auth.captchaURL

export const getCurrentUserPhotos = (state: RootStateType) => state.auth.myPhotos

