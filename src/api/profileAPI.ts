import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'a32b35ae-c578-47f3-b8a9-0885cd248a9d'
    }
})

export const profileAPI = {
    getProfileUserId(userId: number ) {
        return instance.get<ProfileUserType>(`/profile/${userId}`)
    }
}

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
