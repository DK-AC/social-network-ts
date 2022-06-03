import {RootStateType} from '../store'
import {ChatMessageType} from '../../types'
import {StatusChat} from '../../enum'

export const getChatMessages = (state: RootStateType): ChatMessageType[] => state.chat.messages
export const getChatStatus = (state: RootStateType): StatusChat => state.chat.chatStatus
