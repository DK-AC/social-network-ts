import {FC, useEffect, useRef} from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment'

import {ChatMessageType} from '../../../../types'

type PropsType = {
    chatMessage: ChatMessageType
}

export const Message: FC<PropsType> = ({chatMessage}) => {

    const bottom = useRef<null | HTMLDivElement>(null)

    const {message, userName, photo} = chatMessage

    useEffect(() => {
        bottom.current?.scrollIntoView({behavior: 'auto'})
    }, [chatMessage])

    return (
        <div ref={bottom}>
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
        </div>
    )
}