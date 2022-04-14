const FOLLOW_USER = 'FOLLOW_USER'
const UNFOLLOW_USER = 'UNFOLLOW_USER'
const SET_USERS = 'SET_USERS'

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
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: true}
                    : user)
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: false}
                    : user)
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        default:
            return state
    }
}
//actions
export const followUserAC = (userId: number) => ({type: FOLLOW_USER, userId}) as const
export const unfollowUserAC = (userId: number) => ({type: UNFOLLOW_USER, userId}) as const
export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, users}) as const


//types
export type UsersActionsType =
    ReturnType<typeof followUserAC>
    | ReturnType<typeof unfollowUserAC>
    | ReturnType<typeof setUsersAC>

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