import {ChangeEvent, FC, useState} from 'react'
import {Avatar, Button, Comment, Form, Input} from 'antd'
import {useDispatch} from 'react-redux'

import {addChatText, getCurrentUserPhotos, useAppSelector} from '../../store'
import {ChatMessageType} from '../../store/types'
import {EMPTY_STRING} from '../../constans'
import {getChatUserId, getChatUserName} from '../../store/selectors'

const {TextArea} = Input

type EditorProps = {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

type PropsType = {
    webSocketChat: WebSocket
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

export const AddMessageForm: FC<PropsType> = ({webSocketChat}) => {

    const dispatch = useDispatch()

    const userName = useAppSelector(getChatUserName)
    const photo = useAppSelector(getCurrentUserPhotos)
    const userId = useAppSelector(getChatUserId)

    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState(EMPTY_STRING)

    if (!photo) return null

    const handleSubmit = () => {
        if (!value) return


        setSubmitting(true)

        setTimeout(() => {

            const payloadAddChatText: ChatMessageType = {message: value, userId, photo: photo.small, userName}

            dispatch(addChatText(payloadAddChatText))
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

