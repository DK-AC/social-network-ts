import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    status: string,
    updateStatus: (status: string) => void
}

export const ProfileStatus: React.FC<PropsType> = ({status, updateStatus}) => {

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

