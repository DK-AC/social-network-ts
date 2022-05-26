import {AxiosResponse} from 'axios'

import {ResultCode, ResultCodeRequireCaptcha} from '../../enum/resultCode'

export type AxiosResponseType<T = {}> = AxiosResponse<ResponseType<T>>

export type FieldErrorType = { error: string, field: string }

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: FieldErrorType[]
    messages: string[]
    resultCode: ResultCode | ResultCodeRequireCaptcha
}

export type ResponseUserType<U = {}> = {
    items: U
    totalCount: number
    error: string
}




