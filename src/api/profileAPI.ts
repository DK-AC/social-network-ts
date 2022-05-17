import {AxiosResponse} from 'axios';

import {instanceAPI} from './instanceAPI';
import {ResponseType} from './typesAPI';

export const profileAPI = {
    getProfileUserId(userId: number) {
        return instanceAPI.get<any, ResponseType<ProfileUserType>, ProfileUserType>(`/profile/${userId}`)
    },
    getProfileUserStatus(userId: number) {
        return instanceAPI.get<string>(`/profile/status/${userId}`)
    },
    updateProfileUserStatus(params: { status: string }) {
        return instanceAPI.put<any, AxiosResponse<ResponseType<{ status: string }>>>('/profile/status', params)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instanceAPI.put<any, AxiosResponse<ResponseType<PhotosType>, PhotosType>>
        ('/profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    },
    saveProfile(profile: ProfileUserType) {
        return instanceAPI.put<any, AxiosResponse<ResponseType<ProfileUserType>, ResponseType>>('/profile', profile)
    },
};

export type PhotosType = {
    small: string | null
    large: string | null
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
