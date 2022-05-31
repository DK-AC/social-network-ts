import {ChangeEvent, FC, ReactNode, useState} from 'react'
import {Avatar, Button, Comment, Form, Input} from 'antd'
import moment from 'moment'
import {useDispatch} from 'react-redux'

import {addChatText, useAppSelector} from '../../store'
import {ChatMessageType} from '../../store/types/chat'

const {TextArea} = Input

type CommentItem = {
    author: string;
    avatar: string;
    content: ReactNode;
    datetime: string;
}

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

    const userName = useAppSelector(state => state.chat.userName)
    const photo = useAppSelector(state => state.chat.photo)
    const userId = useAppSelector(state => state.chat.userId)

    const [comments, setComments] = useState<CommentItem[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        if (!value) return

        setSubmitting(true)

        setTimeout(() => {
            const payloadAddChatText: ChatMessageType = {message: value, userId, photo, userName}

            dispatch(addChatText(payloadAddChatText))
            webSocketChat.send(value)
            setSubmitting(false)
            setValue('')
            setComments([
                ...comments,
                {
                    author: 'Han Solo',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
            ])
        }, 1000)
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }


    return (
        <>
            <Comment
                avatar={<Avatar src={photo} alt="photo user"/>}
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

