import {RootStateType} from '../store'
import {ChatMessageType} from '../types'
import {Nullable} from '../../types'

export const getChatMessages = (state: RootStateType): ChatMessageType[] => state.chat.chatMessages
export const getChatUserName = (state: RootStateType): Nullable<string> => state.chat.userName
export const getChatUserPhoto = (state: RootStateType): Nullable<string> => state.chat.photo
export const getChatUserId = (state: RootStateType): Nullable<number> => state.chat.userId
