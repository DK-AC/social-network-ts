import { ResponseType } from 'api'

import {Nullable} from '../types'

import {apiConfig} from './apiConfig'
import {AxiosResponseType} from './types'

export const profileAPI = {
    getProfileUser(userId: number) {
        return apiConfig.get<any, ResponseType<ProfileUserType>, ProfileUserType>(`/profile/${userId}`)
    },
    getProfileUserStatus(userId: number) {
        return apiConfig.get<any, AxiosResponseType<string>>(`/profile/status/${userId}`)
    },
    updateProfileUserStatus(payload: { profileStatus: string }) {
        return apiConfig.put<any, AxiosResponseType<string>>('/profile/status', payload)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return apiConfig.put<any, AxiosResponseType<PhotosType>, FormData>
        ('/profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: ProfileUserType) {
        return apiConfig.put<any, AxiosResponseType<ProfileUserType>, ProfileUserType>('/profile', profile)
    },
}

export type PhotosType = {
    small: Nullable<string>
    large: Nullable<string>
}
export type ProfileUserType = {
    aboutMe: string,
    contacts: ContactsUserType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ContactsUserType = {
    facebook: string,
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
