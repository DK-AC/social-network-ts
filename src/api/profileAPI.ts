import {Nullable} from '../types/Nullable'

import {AxiosResponseType, instanceAPI} from './instanceAPI'

export const profileAPI = {
    getProfileUser(userId: number) {
        return instanceAPI.get<any, AxiosResponseType<ProfileUserType>, ProfileUserType>(`/profile/${userId}`)
    },
    getProfileUserStatus(userId: number) {
        return instanceAPI.get<any, AxiosResponseType<string>>(`/profile/status/${userId}`)
    },
    updateProfileUserStatus(payload: { status: string }) {
        return instanceAPI.put<any, AxiosResponseType<string>>('/profile/status', payload)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instanceAPI.put<any, AxiosResponseType<PhotosType>, FormData>
        ('/profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: ProfileUserType) {
        return instanceAPI.put<any, AxiosResponseType<ProfileUserType>, ProfileUserType>('/profile', profile)
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
