import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../../../redux/store';
import {getProfileUserStatusTC} from '../../../../redux/reducers/profileReducer';

type PropsType = {
    userId: number,
}

export const ProfileStatus: React.FC<PropsType> = ({userId}) => {

    const dispatch = useDispatch()

    const status = useAppSelector(state => state.profile.status)

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(status)

    const changeOnEditModeHandle = () => {
        setValue(value)
        setEditMode(true)
    }
    const changeOnViewModeHandle = () => {
        setValue(value)
        setEditMode(false)
    }
    const onChangeValueHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(getProfileUserStatusTC(userId))
    }, [])


    return (
        <>
            {editMode
                ? <input value={value}
                         onBlur={changeOnViewModeHandle}
                         onChange={onChangeValueHandle}
                         autoFocus
                />
                : <span onDoubleClick={changeOnEditModeHandle}>{value}</span>
            }
        </>
    );
};

