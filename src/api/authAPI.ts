import {Nullable} from '../types'

import {apiConfig} from './apiConfig'
import {AxiosResponseType} from './types'


export const authAPI = {
    me() {
        return apiConfig.get<any, AxiosResponseType<AuthUserType>, AuthUserType>('/auth/me')
    },
    login(data: LoginUserType) {
        return apiConfig.post<any, AxiosResponseType<LoginUserType>, LoginUserType>('/auth/login', data)
    },
    logout() {
        return apiConfig.delete<any, AxiosResponseType, ResponseType>('/auth/login')
    },
}

export type AuthUserType = {
    id: number
    login: string
    email: string
}
export type LoginUserType = {
    email: Nullable<string>
    password: Nullable<string>
    rememberMe?: boolean
    captcha?: Nullable<string>
}

