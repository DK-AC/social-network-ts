const FOLLOWED_USER = 'FOLLOWED_USER'
const UNFOLLOWED_USER = 'UNFOLLOWED_USER'

const initialState = {
    users: [
        {
            id: 1,
            name: "Denis",
            uniqueUrlName: '',
            photos: {small: '', large: ''},
            status: 'Have a good day',
            followed: true
        },
        {
            id: 2,
            name: "Jenya",
            uniqueUrlName: '',
            photos: {small: '', large: ''},
            status: 'Have a good night',
            followed: false
        },
    ]
};


export const usersReducer = (state: initialStateType = initialState, action: UsersActionsType): initialStateType => {
    switch (action.type) {
        case FOLLOWED_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: action.follow}
                    : user)
            }
        case UNFOLLOWED_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: action.unfollow}
                    : user)
            }
        default:
            return state
    }
}
//actions
export const followUserAC = (userId: number, follow: boolean) => ({type: FOLLOWED_USER, userId, follow}) as const
export const unfollowUserAC = (userId: number, unfollow: boolean) => ({
    type: UNFOLLOWED_USER,
    userId,
    unfollow
}) as const


//types
export type UsersActionsType = ReturnType<typeof followUserAC> | ReturnType<typeof unfollowUserAC>
type initialStateType = typeof initialState

export type UserType = {
    id: number,
    name: string,
    uniqueUrlName: string,
    photos: {
        small: string,
        large: string
    },
    status: string,
    followed: boolean
}

export type UsersPageType = {
    users: UserType[]
}