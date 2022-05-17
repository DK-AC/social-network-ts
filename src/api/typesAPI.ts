import {AxiosResponse} from 'axios';

import {FieldErrorType} from './authAPI';

export type AxiosResponseType<T = {}> = AxiosResponse<ResponseType<T>>

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: FieldErrorType[]
    messages: string[]
    resultCode: number
}