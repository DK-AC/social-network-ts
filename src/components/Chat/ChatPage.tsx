import React, {useEffect, useState} from 'react'

import {Nullable} from '../../types'

import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import styles from './chatPage.module.css'

const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

export const ChatPage = () => {

    const [wsChannel, setWsChannel] = useState<Nullable<WebSocket>>(null)

    useEffect(() => {
        function createChannel() {
            setWsChannel(new WebSocket(WebSocketCommonChatURL))
        }

        createChannel()
    }, [])

    useEffect(() => {

        if (wsChannel) {
            wsChannel.addEventListener('close', (event) => {
                console.log('Close ws')
            })
        }

    }, [wsChannel])

    return (
        <>
            <div className={styles.container}>
                <Messages wsChannel={wsChannel}/>
            </div>
            <AddMessageForm wsChannel={wsChannel}/>
        </>
    )
}

