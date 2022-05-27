import React, {FC} from 'react'
import {Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons'

type PropsType = {
    message: string
}

export const Message: FC<PropsType> = ({message}) => {
    return (
        <div>
            <Avatar icon={<UserOutlined />}/>
            {message}
            <hr/>
        </div>
    )
}