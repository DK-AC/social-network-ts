import {RootStateType} from '../store'
import {Nullable} from '../../types'
import {PhotosType} from '../../types/profile'

export const getIsAuth = (state: RootStateType): boolean => state.auth.isAuth

export const getCurrentUserId = (state: RootStateType): Nullable<number> => state.auth.id

export const getCurrentUserLogin = (state: RootStateType): Nullable<string> => state.auth.login

export const getCurrentUserEmail = (state: RootStateType): Nullable<string> => state.auth.email

export const getCaptchaUrl = (state: RootStateType): Nullable<string> => state.auth.captchaURL

export const getCurrentUserPhotos = (state: RootStateType): Nullable<PhotosType> => state.auth.myPhotos

