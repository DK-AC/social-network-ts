const initialState = {
    friends: [
        {id: 1, name: 'Artiom'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Ivan'},
    ]
}

type initialStateType = typeof initialState

export const sideBarReducer = (state: initialStateType = initialState, action: SideBarActionsType): initialStateType => {
    switch (action) {
        default :
            return state
    }
}

export type FriendDataType = { id: number, name: string }
export type SideBarPageType = {
    friends: FriendDataType[]
}
export type SideBarActionsType = {}
