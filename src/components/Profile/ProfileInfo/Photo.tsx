import React, {ChangeEvent, FC} from 'react'
import {useDispatch} from 'react-redux'
import {Input} from 'antd'

import ava from '../../../assets/img/client-2-512.webp'
import {savePhoto} from '../../../store/reducers/profileReducer'

import styles from './profileInfo.module.css'
import {PhotosType} from '../../../types/profile'

type PropsType = {
    photo: PhotosType
    isOwner: boolean
}

export const Photo: FC<PropsType> = ({photo, isOwner}) => {

    const dispatch = useDispatch()

    const savePhotoHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    return (
        <div>
            <img className={styles.avatar} src={photo.large || ava} alt="avatar"/>
            {isOwner
                ? <Input type={'file'} size={'small'} onChange={savePhotoHandle} bordered={false}/>
                : ''}
        </div>)
}