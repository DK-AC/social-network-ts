import {ResponseType} from './authAPI';
import {instanceAPI} from './instanceAPI';

export const profileAPI = {
    getProfileUserId(userId: number) {
        return instanceAPI.get<any, ResponseType<ProfileUserType>, ProfileUserType>(`/profile/${userId}`)
    },
    getProfileUserStatus(userId: number) {
        return instanceAPI.get<any, ResponseType<string>, string>(`/profile/status/${userId}`)
    },
    updateProfileUserStatus(params: { status: string }) {
        return instanceAPI.put<any, ResponseType<{ status: string }>>('/profile/status', params)
    },
};

export type ProfileUserType = {
    aboutMe: string,
    contacts: ContactsUserType,
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: { small: string, large: string }
}

type ContactsUserType = {
    facebook: string,
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
