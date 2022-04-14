const FOLLOWED = 'FOLLOWED'
const UNFOLLOWED = 'UNFOLLOWED'

const initialState = {
    users: [
        {
            id: 1,
            name: "Denis",
            uniqueUrlName: '',
            photos: {small: '', large: ''},
            status: '',
            followed: true
        },
        {
            id: 2,
            name: "Jenya",
            uniqueUrlName: '',
            photos: {small: '', large: ''},
            status: '',
            followed: false
        },
    ]
};


export const usersReducer = (state: initialStateType = initialState, action: UsersActionsType): initialStateType => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: action.followed}
                    : user)
            }
        case UNFOLLOWED:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userId
                    ? {...user, followed: action.unfollowed}
                    : user)
            }
        default:
            return state
    }
}
//actions
export const followed = (userId: number, followed: boolean) => ({type: FOLLOWED, userId, followed}) as const
export const unfollowed = (userId: number, unfollowed: boolean) => ({type: UNFOLLOWED, userId, unfollowed}) as const


//types
export type UsersActionsType = ReturnType<typeof followed> | ReturnType<typeof unfollowed>
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