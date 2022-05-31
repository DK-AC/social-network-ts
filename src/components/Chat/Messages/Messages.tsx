import {FC, useEffect, useState} from 'react'

import {ChatMessageType} from '../../../store/types'

import {Message} from './Message'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

export const Messages: FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const webSocketChat = new WebSocket(WebSocketCommonChatURL)

        webSocketChat.addEventListener('message', (event) => {

            const newMessages = JSON.parse(event.data)

            setMessages((prevState) => [...prevState, ...newMessages])
        })
    }, [])


    const message = messages.map((message: ChatMessageType, index) => {
        return <Message key={index + '' + message.userId} chatMessage={message}/>
    })

    return (
        <>{message}</>
    )
}