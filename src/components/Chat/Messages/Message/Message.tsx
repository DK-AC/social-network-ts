import {FC} from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment'

import {ChatMessageType} from '../../../../store/types'

type PropsType = {
    chatMessage: ChatMessageType
}

export const Message: FC<PropsType> = ({chatMessage}) => {

    const {message, userName, photo} = chatMessage

    return (
        <Comment
            author={<a>{userName}</a>}
            avatar={<Avatar src={photo} alt="Han Solo"/>}
            content={<p>{message}</p>}
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                </Tooltip>
            }
        />
    )
}