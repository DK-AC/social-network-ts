import React, {ChangeEvent, FC, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {useAppSelector} from '../../../store/store'
import {updateProfileUserStatus} from '../../../store'
import {getProfileStatus} from '../../../store'


export const Status: FC = () => {

    const dispatch = useDispatch()

    const status = useAppSelector(getProfileStatus)

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(status)

    const changeOnEditModeHandle = () => {
        setEditMode(true)
        setValue(value)
    }

    useEffect(() => {
        setValue(status)
        return () => {
            setValue('')
        }
    }, [status])

    const changeOnViewModeHandle = () => {
        setEditMode(false)
        updateStatus(value)
    }

    const onChangeValueHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const updateStatus = (profileStatus: string) => {
        dispatch(updateProfileUserStatus({status: profileStatus}))
    }


    return (
        <>
            {editMode
                ? <input value={value}
                         onBlur={changeOnViewModeHandle}
                         onChange={onChangeValueHandle}
                         autoFocus
                />
                : <span onDoubleClick={changeOnEditModeHandle}><b>Status: </b>{status || '----'}</span>
            }
        </>
    )
}

