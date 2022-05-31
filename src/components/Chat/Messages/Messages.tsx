import {FC, useEffect} from 'react'

import {useDispatch} from 'react-redux'

import {getChatMessages, useAppSelector} from '../../../store'
import {ChatMessageType} from '../../../store/types/chat'

import {setChatMessages} from '../../../store/reducers/chatReducer'

import {Message} from './Message'

type PropsType = {
    webSocketChat: WebSocket
}

export const Messages: FC<PropsType> = ({webSocketChat}) => {

    const dispatch = useDispatch()

    const messages = useAppSelector(getChatMessages)

    useEffect(() => {
        webSocketChat.addEventListener('message', (event) => {
            dispatch(setChatMessages(JSON.parse(event.data)))
        })
    }, [])


    if (!messages) {
        return null
    }


    const message = messages.map((message: ChatMessageType, index) => {
        return <Message key={index + '' + message.userId} chatMessage={message}/>
    })

    return (
        <div>
            {message}
        </div>
    )
}