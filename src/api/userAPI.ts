import {AxiosResponse} from 'axios';


import {instanceAPI} from './instanceAPI';
import {AxiosResponseType, ParamsUserPageType, ResponseType, ResponseUserType, UserType} from './typesAPI';

export const userAPI = {
    getUsers(params: ParamsUserPageType) {
        return instanceAPI.get<any, AxiosResponse<ResponseUserType<UserType[]>>, UserType[]>
        (`/users?page=${params.currentPage}&count=${params.pageSize}`)
    },
    followUser(userId: number) {
        return instanceAPI.post<any, AxiosResponseType, ResponseType>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instanceAPI.delete<any, AxiosResponseType, ResponseType>(`/follow/${userId}`)
    },
};

