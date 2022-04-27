import {AxiosResponse} from 'axios';

import {UserType} from '../redux/reducers/usersReducer';

import {ResponseType} from './authAPI';
import {instanceAPI} from './instanceAPI';

export const userAPI = {
    getUsers(params: ParamsUserPageType) {
        return instanceAPI.get<any, AxiosResponse<ResponseUserType<UserType[]>>, UserType[]>
        (`/users?page=${params.currentPage}&count=${params.pageSize}`)
            .then(res => res.data);
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