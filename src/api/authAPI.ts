import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d',
    },
});

export const authAPI = {
    me() {
        return instance.get<any, AxiosResponse<ResponseType<AuthUserType>>, AuthUserType>('/auth/me');
    },
    login(data: LoginUserType) {
        return instance.post<any, AxiosResponse<ResponseType<LoginUserType>>, LoginUserType>('/auth/login', data);
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