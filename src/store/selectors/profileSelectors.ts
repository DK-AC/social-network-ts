import {RootStateType} from '../store'
import {ProfileUserType} from '../../api'
import {Nullable} from '../../types'
import {PostsType} from '../reducers/profileReducer'

export const getProfileStatus = (state: RootStateType): string => state.profile.profileStatus

export const getUserProfile = (state: RootStateType): Nullable<ProfileUserType> => state.profile.profile

export const getProfilePosts = (state: RootStateType): PostsType[] => state.profile.posts


