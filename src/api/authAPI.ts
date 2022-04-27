import {AxiosResponse} from 'axios';

import {instanceAPI} from './instanceAPI';

export const authAPI = {
    me() {
        return instanceAPI.get<any, AxiosResponse<ResponseType<AuthUserType>>, AuthUserType>('/auth/me');
    },
    login(data: LoginUserType) {
        return instanceAPI.post<any, AxiosResponse<ResponseType<LoginUserType>>, LoginUserType>('/auth/login', data);
    },
};

export type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type AuthUserType = {
    id: number
    login: string
    email: string
}

export type LoginUserType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}