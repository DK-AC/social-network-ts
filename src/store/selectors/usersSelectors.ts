import {RootStateType} from '../store'

export const getUsersSelector = (state: RootStateType) => state.users.users

export const getTotalCount = (state: RootStateType) => state.users.totalCount

export const getPageSize = (state: RootStateType) => state.users.pageSize

export const getCurrentPage = (state: RootStateType) => state.users.currentPage

export const getFollowingInProgress = (state: RootStateType) => state.users.followingInProgress

export const getFilterFriend = (state: RootStateType) => state.users.filter.friend

export const getFilterTerm = (state: RootStateType) => state.users.filter.term





