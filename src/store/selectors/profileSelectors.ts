import {RootStateType} from '../store'
import {Nullable} from '../../types'
import {PostType} from '../types/profile'
import {ProfileUserType} from '../../types/profile'

export const getProfileStatus = (state: RootStateType): string => state.profile.profileStatus

export const getUserProfile = (state: RootStateType): Nullable<ProfileUserType> => state.profile.profile

export const getProfilePosts = (state: RootStateType): PostType[] => state.profile.posts


