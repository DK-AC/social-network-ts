import {AxiosResponse} from 'axios';


import {instanceAPI} from './instanceAPI';
import {ResponseType} from './typesAPI';

export const userAPI = {
    getUsers(params: ParamsUserPageType) {
        return instanceAPI.get<any, AxiosResponse<ResponseUserType<UserType[]>>, UserType[]>
        (`/users?page=${params.currentPage}&count=${params.pageSize}`)
    },
    followUser(userId: number) {
        return instanceAPI.post<any, AxiosResponse<ResponseType>, ResponseType>(`/follow/${userId}`)
            .then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instanceAPI.delete<any, AxiosResponse<ResponseType>, ResponseType>(`/follow/${userId}`)
            .then(res => res.data)
    },
};

export type ResponseUserType<U = {}> = {
    items: U
    totalCount: number
    error: string
}

export type ParamsUserPageType = {
    currentPage: number
    pageSize: number
}

export type UserType = {
    id: number,
    name: string,
    uniqueUrlName: string,
    photos: {
        small: string,
        large: string
    },
    status: string,
    followed: boolean
}