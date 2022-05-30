import {ResponseType} from 'api'

import {PhotosType, ProfileUserType} from '../types'

import {apiConfig} from './apiConfig'
import {AxiosResponseType} from './types'

export const profileAPI = {
    getProfileUser(userId: number) {
        return apiConfig.get<any, ResponseType<ProfileUserType>, ProfileUserType>(`/profile/${userId}`)
    },
    getProfileUserStatus(userId: number) {
        return apiConfig.get<any, AxiosResponseType<string>>(`/profile/status/${userId}`)
    },
    updateProfileUserStatus(payload: { status: string }) {
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

