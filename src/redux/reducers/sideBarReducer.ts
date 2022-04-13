import {ActionsType} from "../store";

const initialState = {
    friends: [
        {id: 1, name: 'Artiom'},
        {id: 2, name: 'Dima'},
        {id: 3, name: 'Ivan'},
    ]
}

export const sideBarReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        default :
            return state
    }
}

export type FriendDataType = { id: number, name: string }
export type SideBarPageType = {
    friends: FriendDataType[]
}