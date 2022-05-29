import {RootStateType} from '../store'
import {DialogsType, MessagesType} from '../reducers/dialogsReducer'

export const getDialogs = (state: RootStateType): DialogsType[] => state.dialogs.dialogs

export const getMessages = (state: RootStateType): MessagesType[] => state.dialogs.messages


