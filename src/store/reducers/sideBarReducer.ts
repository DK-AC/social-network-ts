const initialState = {
    friends: [
        {id: 1, name: 'Artiom'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Ivan'},
    ],
}

export const sideBarReducer = (state = initialState, action: SideBarActionsType) => {
    switch (action) {
        default :
            return state
    }
}

export type InitialSideBarStateType = typeof initialState
export type SideBarActionsType = {}
