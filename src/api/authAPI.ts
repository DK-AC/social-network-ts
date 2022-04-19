import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const authAPI = {
    me() {
        return instance.get<any, AxiosResponse<ResponseType<LoginUserType>>, LoginUserType>('/auth/me')
    }
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

type LoginUserType = {
    id: number
    login: string
    email: string
}