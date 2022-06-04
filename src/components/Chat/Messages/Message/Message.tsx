import React, {FC, memo, useEffect, useRef, useState} from 'react'
import {Avatar, Comment, Tooltip} from 'antd'
import moment from 'moment'

import {ChatMessageType} from '../../../../types'

type PropsType = {
    chatMessage: ChatMessageType
}

export const Message: FC<PropsType> = memo(({chatMessage}) => {

    console.log('Message')

    const {message, userName, photo} = chatMessage

    const bottom = useRef<null | HTMLDivElement>(null)

    const [isScrollAuto, setIsScrollAuto] = useState(true)


    const onMessageContentAutoScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = event.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isScrollAuto && setIsScrollAuto(true)
        } else {
            isScrollAuto && setIsScrollAuto(false)
        }
    }

    useEffect(() => {
        if (isScrollAuto) {
            bottom.current?.scrollIntoView({behavior: 'auto'})
        }
    }, [chatMessage])

    return (
        <div style={{overflow: 'auto'}} ref={bottom} onScroll={onMessageContentAutoScroll}>
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
})