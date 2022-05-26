import {RootStateType} from '../redux/store'

export const getDialogs = (state: RootStateType) => state.dialogs.dialogs

export const getMessages = (state: RootStateType) => state.dialogs.messages

