import {FC} from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment'

import {ChatMessageType} from '../../../../store/types/chat'

type PropsType = {
    message: ChatMessageType
}

export const Message: FC<PropsType> = ({message}) => {

    const {url, author, text} = message

    return (
        <Comment
            author={<a>{author}</a>}
            avatar={<Avatar src={url} alt="Han Solo"/>}
            content={
                <p>
                    {text}
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