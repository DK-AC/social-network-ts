import {AxiosResponse} from 'axios'

import {AxiosResponseType, instanceAPI, ResponseType, ResponseUserType} from './instanceAPI'
import {PhotosType} from './profileAPI'


export const userAPI = {
    getUsers(params: ParamsUserPageType) {
        return instanceAPI.get<any, AxiosResponse<ResponseUserType<UserType[]>>, UserType[]>
        (`/users?page=${params.currentPage}&count=${params.pageSize}&term=${params.term}` +(params.friend===null?'':`&friend=${params.friend}`) )
    },
    followUser(userId: number) {
        return instanceAPI.post<any, AxiosResponseType, ResponseType>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return instanceAPI.delete<any, AxiosResponseType, ResponseType>(`/follow/${userId}`)
    },
}

export type UserType = {
    id: number
    name: string
    uniqueUrlName: string
    photos: PhotosType
    status: string
    followed: boolean
}
export type ParamsUserPageType = {
    currentPage: number
    pageSize: number
    term: string
    friend: null | boolean
}

