import {FC, useEffect, useState} from 'react'

import {ChatMessageType} from '../../../store/types'
import {Nullable} from '../../../types'

import {Message} from './Message'

type PropsType = {
    wsChannel: Nullable<WebSocket>
}

export const Messages: FC<PropsType> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        if (wsChannel) {
            wsChannel.addEventListener('message', (event) => {
                const newMessages = JSON.parse(event.data)
                setMessages((prevState) => [...prevState, ...newMessages])
            })
        }
    }, [wsChannel])

    const message = messages.map((message: ChatMessageType, index) => {
        return <Message key={index + '' + message.userId} chatMessage={message}/>
    })

    return (
        <>{message}</>
    )
}