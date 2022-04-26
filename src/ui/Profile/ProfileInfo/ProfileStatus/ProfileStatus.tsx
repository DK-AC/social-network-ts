import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    aboutMe: string,
}

export const ProfileStatus: React.FC<PropsType> = ({aboutMe}) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState<string>(aboutMe)

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

