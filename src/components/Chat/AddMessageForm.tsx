import {ChangeEvent, FC, useEffect, useState} from 'react'
import {Avatar, Button, Comment, Form, Input} from 'antd'

import {getCurrentUserPhotos, useAppSelector} from '../../store'
import {EMPTY_STRING} from '../../constans'
import {Nullable} from '../../types'
import {WebSocketEventType, WebSocketStatus} from '../../enum'
import {WebSocketStatusType} from '../../types/chat'

const {TextArea} = Input

type EditorProps = {
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: () => void;
    submitting: boolean;
    value: string;
    readyStatus: WebSocketStatusType
}

type PropsType = {
    webSocketChannel: Nullable<WebSocket>
}


const Editor = ({onChange, onSubmit, submitting, value, readyStatus}: EditorProps) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button disabled={readyStatus !== WebSocketStatus.Ready}
                    htmlType="submit"
                    loading={submitting}
                    onClick={onSubmit}
                    type="default"
            >
                Add Comment
            </Button>
        </Form.Item>
    </>
)

export const AddMessageForm: FC<PropsType> = ({webSocketChannel}) => {

    console.log('')
    console.log('AddMessageForm')

    const photo = useAppSelector(getCurrentUserPhotos)

    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState(EMPTY_STRING)
    const [readyStatus, setReadyStatus] = useState<WebSocketStatusType>(WebSocketStatus.Pending)


    useEffect(() => {

            const openWebSocketEvent = () => {
                setReadyStatus(WebSocketStatus.Ready)
            }
            webSocketChannel?.addEventListener(WebSocketEventType.Open, openWebSocketEvent)
            return () => {
                webSocketChannel?.removeEventListener(WebSocketEventType.Open, openWebSocketEvent)
            }
        }, [webSocketChannel],
    )

    const handleSubmit = () => {
        if (!value) return

        setSubmitting(true)

        setTimeout(() => {
            webSocketChannel?.send(value)

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
                        readyStatus={readyStatus}
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

