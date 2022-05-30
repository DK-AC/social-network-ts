import {Nullable} from '../../types'
import {UserType} from '../../types'

export type FollowUnFollowPayloadType = { userId: number, isFollow: boolean }
export type PayloadUsersReturnedType = {
    users: UserType[]
    totalCount: number
    term: string
    friend: Nullable<boolean>
}