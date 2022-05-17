import {instanceAPI} from './instanceAPI';
import {AxiosResponseType} from './typesAPI';

export const authAPI = {
    me() {
        return instanceAPI.get<any, AxiosResponseType<AuthUserType>, AuthUserType>('/auth/me')
            .then(res => res.data)
    },
    login(data: LoginUserType) {
        return instanceAPI.post<any, AxiosResponseType<LoginUserType>, LoginUserType>('/auth/login', data)
            .then(res => res.data)
    },
    logout() {
        return instanceAPI.delete<any, AxiosResponseType, ResponseType>('/auth/login')
            .then(res => res.data)
    },
};


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