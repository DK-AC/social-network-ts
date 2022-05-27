import React from 'react'
import TextArea from 'antd/es/input/TextArea'
import {Button} from 'antd'
import {SendOutlined} from '@ant-design/icons'

export const AddMessageForm = () => {
    return (
        <div>
            <TextArea/>
            <Button htmlType={'submit'}
                    icon={<SendOutlined/>}
                    size={'small'}>
                Send message
            </Button>
        </div>
    )
}

