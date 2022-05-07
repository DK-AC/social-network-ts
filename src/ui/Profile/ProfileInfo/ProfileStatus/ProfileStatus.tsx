import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../../../redux/store';
import {updateProfileUserStatusTC} from '../../../../redux/reducers/profileReducer';


export const ProfileStatus: React.FC = () => {
    console.log('need refactoring redux toolkit')

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
        dispatch(updateProfileUserStatusTC(status))
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
                : <span onDoubleClick={changeOnEditModeHandle}>{status || '----'}</span>
            }
        </>
    );
};

