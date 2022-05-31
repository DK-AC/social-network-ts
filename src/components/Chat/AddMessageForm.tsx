import {ChangeEvent, FC, useState} from 'react'
import {Avatar, Button, Comment, Form, Input} from 'antd'

import {getCurrentUserPhotos, useAppSelector} from '../../store'
import {EMPTY_STRING} from '../../constans'

const {TextArea} = Input

type EditorProps = {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const Editor = ({onChange, onSubmit, submitting, value}: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="default">
                Add Comment
            </Button>
        </Form.Item>
    </>
)

export const AddMessageForm: FC = () => {

    const WebSocketCommonChatURL = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'

    const webSocketChat = new WebSocket(WebSocketCommonChatURL)

    const photo = useAppSelector(getCurrentUserPhotos)

    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState(EMPTY_STRING)

    if (!photo) return null

    const handleSubmit = () => {
        if (!value) return

        setSubmitting(true)

        setTimeout(() => {
            webSocketChat.send(value)

            setSubmitting(false)
            setValue(EMPTY_STRING)
        }, 1000)
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }


    return (
        <>
            <Comment
                avatar={<Avatar src={photo.small} alt="photo user"/>}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </>
    )
}

