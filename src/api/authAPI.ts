import {Nullable} from '../types/Nullable'

import {AxiosResponseType, instanceAPI} from './instanceAPI'


export const authAPI = {
    me() {
        return instanceAPI.get<any, AxiosResponseType<AuthUserType>, AuthUserType>('/auth/me')
    },
    login(data: LoginUserType) {
        return instanceAPI.post<any, AxiosResponseType<LoginUserType>, LoginUserType>('/auth/login', data)
    },
    logout() {
        return instanceAPI.delete<any, AxiosResponseType, ResponseType>('/auth/login')
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

