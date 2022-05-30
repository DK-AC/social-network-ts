import React, {FC} from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment'


type PropsType = {
    // url: string
    // text: string
    // author: string
}

export const Message: FC<PropsType> = () => {

    const message = {
        url: 'https://joeschmoe.io/api/v1/random',
        text: 'Test',
        author: 'DK',
    }

    return (
        <Comment
            author={<a>{message.author}</a>}
            avatar={<Avatar src={message.url} alt="Han Solo"/>}
            content={
                <p>
                    {message.text}
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    )
}