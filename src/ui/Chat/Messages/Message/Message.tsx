import React, {FC} from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment'


type PropsType = {
    message: string
}

export const Message: FC<PropsType> = ({message}) => {

    return (
        <Comment
            author={<a>Han Solo</a>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
            content={
                <p>
                    {message}
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