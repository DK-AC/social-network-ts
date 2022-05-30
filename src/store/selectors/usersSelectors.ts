import {RootStateType} from '../store'
import {UserType} from '../../types'

export const getUsersSelector = (state: RootStateType): UserType[] => state.users.users

export const getTotalCount = (state: RootStateType): number => state.users.totalCount

export const getPageSize = (state: RootStateType): number => state.users.pageSize

export const getCurrentPage = (state: RootStateType): number => state.users.currentPage

export const getFollowingInProgress = (state: RootStateType): number[] => state.users.followingInProgress

//todo need refactoring string to boolean
export const getFilterFriend = (state: RootStateType): string | boolean | null => state.users.filter.friend

export const getFilterTerm = (state: RootStateType): string => state.users.filter.term





