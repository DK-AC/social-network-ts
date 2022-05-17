import {AxiosResponse} from 'axios';

export type AxiosResponseType<T = {}> = AxiosResponse<ResponseType<T>>

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
    resultCode: number
}

