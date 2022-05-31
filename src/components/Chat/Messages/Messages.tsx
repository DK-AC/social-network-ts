import {FC} from 'react'

import {getChatMessages, useAppSelector} from '../../../store'
import {ChatMessageType} from '../../../store/types/chat'

import {Message} from './Message'

export const Messages: FC = () => {

    const messages = useAppSelector(getChatMessages)

    const message = messages.map((message: ChatMessageType) => {
        return <Message key={message.url} message={message}/>
    })

    return (
        <div>
            {message}
        </div>
    )
}