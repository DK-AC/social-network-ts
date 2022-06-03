import {ChangeEvent, FC, useState} from 'react'
import {Avatar, Button, Comment, Form, Input} from 'antd'
import {useDispatch} from 'react-redux'

import {getChatStatus, getCurrentUserPhotos, useAppSelector} from '../../store'
import {EMPTY_STRING} from '../../constans'
import {StatusChat} from '../../enum'
import {sendChatMessage} from '../../store/reducers'

const {TextArea} = Input

type EditorProps = {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const Editor = ({onChange, onSubmit, submitting, value}: EditorProps) => {

    const status = useAppSelector(getChatStatus)

    return (
        <>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value}/>
            </Form.Item>
            <Form.Item>
                <Button disabled={status !== StatusChat.Ready}
                        htmlType="submit"
                        loading={submitting}
                        onClick={onSubmit}
                        type="default"
                >
                    Add Comment
                </Button>
            </Form.Item>
        </>)
}

export const AddMessageForm: FC = () => {

    const dispatch = useDispatch()

    const photo = useAppSelector(getCurrentUserPhotos)

    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState(EMPTY_STRING)


    const handleSubmit = () => {
        if (!value) return

        setTimeout(() => {

            dispatch(sendChatMessage({message: value}))

            setSubmitting(false)
            setValue(EMPTY_STRING)

        }, 1000)
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    if (!photo) {
        return null
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

