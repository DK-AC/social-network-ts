import axios, {AxiosResponse} from 'axios'

export const instanceAPI = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d',
    },
})

export type AxiosResponseType<T = {}> = AxiosResponse<ResponseType<T>>

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeRequireCaptchaEnum {
    Captcha = 10,
}

export type FieldErrorType = { error: string, field: string }
export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: FieldErrorType[]
    messages: string[]
    resultCode: ResultCodeEnum | ResultCodeRequireCaptchaEnum
}
export type ResponseUserType<U = {}> = {
    items: U
    totalCount: number
    error: string
}