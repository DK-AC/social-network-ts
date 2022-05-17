import {AxiosResponse} from 'axios';

import {PhotosType} from './profileAPI';

export type AxiosResponseType<T = {}> = AxiosResponse<ResponseType<T>>

export enum ResultCode {
    Success = 0,
    Error = 1,
    Captcha = 10,
}

export type FieldErrorType = { error: string, field: string };
export type AuthUserType = {
    id: number
    login: string
    email: string
}
export type LoginUserType = {
    email: string | null
    password: string | null
    rememberMe?: boolean
    captcha?: string | null
}
export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: FieldErrorType[]
    messages: string[]
    resultCode: ResultCode
}

export type ResponseUserType<U = {}> = {
    items: U
    totalCount: number
    error: string
}
export type ParamsUserPageType = {
    currentPage: number
    pageSize: number
}
export type UserType = {
    id: number,
    name: string,
    uniqueUrlName: string,
    photos: PhotosType
    status: string,
    followed: boolean
}