import {ChangeEvent, ReactNode, useState} from 'react'
import {Avatar, Button, Comment, Form, Input} from 'antd'
import moment from 'moment'
import {useDispatch} from 'react-redux'

import {addChatText, getCurrentUserLogin, getCurrentUserPhotos, useAppSelector} from '../../store'
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

export const AddMessageForm = () => {

    const dispatch = useDispatch()

    const author = useAppSelector(getCurrentUserLogin)
    const photos = useAppSelector(getCurrentUserPhotos)

    const [comments, setComments] = useState<CommentItem[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')

    if (!author) {
        return null
    }

    if (!photos) {
        return null
    }


    const handleSubmit = () => {
        if (!value) return

        setSubmitting(true)

        setTimeout(() => {
            const payloadAddChatText: ChatMessageType = {text: value, author, url: photos.small}

            dispatch(addChatText(payloadAddChatText))
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
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
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

