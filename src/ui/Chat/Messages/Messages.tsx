import React, {FC} from 'react'

import {Message} from './Message'

export const Messages: FC = () => {

    const messages = ['test1', 'test2', 'test3', 'test4', 'test5']

    const message = messages.map((message, index) => {
        return <Message key={index} message={message}/>
    })

    return (
        <div>
            {message}
        </div>
    )
}