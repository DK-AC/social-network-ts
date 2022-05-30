import {FC, SyntheticEvent, useEffect, useState} from 'react'
import {Alert, Button} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'

import {getAppError, setAppError, useAppSelector} from '../../../store'

import styles from './errorMessage.module.css'

export const ErrorMessage: FC = () => {

    const dispatch = useDispatch()

    const error = useAppSelector(getAppError)

    const [visible, setVisible] = useState(false)

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return
        }

        dispatch(setAppError({error: null}))
    }

    useEffect(() => {

        if (!error) {
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {

            setVisible(false)
            dispatch(setAppError({error: null}))
        }, 3000)
        return () => clearTimeout(timer)
    }, [error])

    if (!visible) return null

    return (
        <Alert type="error" message={error} className={styles.errorMessage} action={
            <Button size="small"
                    type="link"
                    onClick={handleClose}
                    style={{color: '#ff4d4f'}}
                    icon={<CloseOutlined/>}
            />
        }/>
    )
}

