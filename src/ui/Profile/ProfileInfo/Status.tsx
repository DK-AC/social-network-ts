import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {useAppSelector} from '../../../redux/store'
import {updateProfileUserStatus} from '../../../redux/reducers/profileReducer'


export const Status: React.FC = () => {

    const dispatch = useDispatch()

    const status = useAppSelector(state => state.profile.status)

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(status)

    const changeOnEditModeHandle = () => {
        setEditMode(true)
        setValue(value)
    }
    const changeOnViewModeHandle = () => {
        setEditMode(false)
        updateStatus(value)
    }
    const onChangeValueHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const updateStatus = (status: string) => {
        dispatch(updateProfileUserStatus({status}))
    }


    useEffect(() => {
        setValue(status)
        return () => {
            setValue('')
        }
    }, [status])

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

