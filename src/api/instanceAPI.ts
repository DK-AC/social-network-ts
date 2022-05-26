import axios, {AxiosResponse} from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL
const apiKey = String(process.env.REACT_APP_API_KEY)

export const instanceAPI = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'API-KEY': apiKey,
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