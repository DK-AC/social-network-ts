import {RootStateType} from '../store'

export const getProfileStatus = (state: RootStateType) => state.profile.profileStatus

export const getUserProfile = (state: RootStateType) => state.profile.profile

export const getProfilePosts = (state: RootStateType) => state.profile.posts


