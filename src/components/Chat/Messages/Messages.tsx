import {FC} from 'react'

import {ChatMessageType} from '../../../store/types'
import {getChatMessages, useAppSelector} from '../../../store'

import {Message} from './Message'

export const Messages: FC = () => {

    const messages = useAppSelector(getChatMessages)

    const message = messages.map((message: ChatMessageType, index) => {
        return <Message key={index + '' + message.userId} chatMessage={message}/>
    })

    return (
        <>{message}</>
    )
}