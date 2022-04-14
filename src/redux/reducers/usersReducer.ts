const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'

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


export const usersReducer = (state: initialStateType = initialState, action: UsersActionsType) => {
    switch (action.type) {
        default:
            return state
    }
}
//actions
export const follow = (follow: boolean) => ({type: FOLLOW, follow}) as const
export const unfollow = (unfollow: boolean) => ({type: UNFOLLOW, unfollow}) as const


//types
export type UsersActionsType = ReturnType<typeof follow> | ReturnType<typeof unfollow>
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