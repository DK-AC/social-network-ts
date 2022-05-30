import {RootStateType} from '../store'
import {DialogsType, MessagesType} from '../types'

export const getDialogs = (state: RootStateType): DialogsType[] => state.dialogs.dialogs

export const getMessages = (state: RootStateType): MessagesType[] => state.dialogs.messages


