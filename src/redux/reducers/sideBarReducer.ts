import {ActionsType} from "../store";

export type FriendDataType = { id: number, name: string }
export type SideBarPageType = {
    friends: FriendDataType[]
}
export const sideBarReducer = (state: SideBarPageType, action: ActionsType) => {
    switch (action.type) {
        default :
            return state
    }
}