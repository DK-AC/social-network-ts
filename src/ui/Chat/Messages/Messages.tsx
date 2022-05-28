import React, {FC} from 'react'

import {Message} from './Message'

type MessageType = {
    url: string
    text: string
    author: string
}

export const Messages: FC = () => {

    const messages = [1, 2, 3, 4]

    const message = messages.map((message: any) => {
        return <Message key={message}/>
    })

    return (
        <div>
            {message}
        </div>
    )
}