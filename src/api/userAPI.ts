import axios, {AxiosResponse} from "axios";
import {UserType} from "../redux/reducers/usersReducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const userAPI = {
    getUsers() {
        return instance.get<any, AxiosResponse<ResponseUserType<UserType[]>>, UserType[]>('/users')
            .then(res => res.data)
    }
}

export type ResponseUserType<U = {}> = {
    items: U
    totalCount: number
    error: string
}