import {PhotosType} from '../profile'

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