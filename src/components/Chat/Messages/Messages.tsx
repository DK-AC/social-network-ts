import {FC} from 'react'

import {ChatMessageType} from '../../../types'
import {EMPTY_STRING} from '../../../constans'
import {getChatMessages, useAppSelector} from '../../../store'

import {Message} from './Message'


export const Messages: FC = () => {

    const messages = useAppSelector(getChatMessages)

    const message = messages.map((message: ChatMessageType, index) => {
        return <Message key={index + EMPTY_STRING + message.userId} chatMessage={message}/>
    })

    return (
        <>{message}</>
    )
}