import {AxiosResponse} from 'axios'

import {PhotosType} from '../types/profile'

import {apiConfig} from './apiConfig'
import {AxiosResponseType, ResponseUserType} from './types'


export const userAPI = {
    getUsers(params: ParamsUserPageType) {
        return apiConfig.get<any, AxiosResponse<ResponseUserType<UserType[]>>, UserType[]>
        (`/users?page=${params.currentPage}&count=${params.pageSize}&term=${params.term}` + (params.friend === null ? '' : `&friend=${params.friend}`))
    },
    followUser(userId: number) {
        return apiConfig.post<any, AxiosResponseType, ResponseType>(`/follow/${userId}`)
    },
    unfollowUser(userId: number) {
        return apiConfig.delete<any, AxiosResponseType, ResponseType>(`/follow/${userId}`)
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
    friend: null | boolean | string
}

export type UriParamsType = { page: string, count: string, term: string, friend: string }



