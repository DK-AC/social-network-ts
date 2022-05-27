import React, {useState} from 'react'
import {Avatar, Button, Comment, Form, Input, List} from 'antd'
import moment from 'moment'

const {TextArea} = Input

type CommentItem = {
    author: string;
    avatar: string;
    content: React.ReactNode;
    datetime: string;
}

type EditorProps = {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
}

const CommentList = ({comments}: { comments: CommentItem[] }) => (
    <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
)

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

    const [comments, setComments] = useState<CommentItem[]>([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')

    const handleSubmit = () => {
        if (!value) return

        setSubmitting(true)

        setTimeout(() => {
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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    return (
        <>
            {comments.length > 0 && <CommentList comments={comments}/>}
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

