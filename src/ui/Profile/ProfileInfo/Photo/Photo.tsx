import React, {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';

import styles from '../profileInfo.module.css';
import ava from '../../../../assets/img/client-2-512.webp';
import {PhotosType} from '../../../../api/profileAPI';
import {savePhotoTC} from '../../../../redux/reducers/profileReducer';

type PropsType = {
    photo: PhotosType
    isOwner: boolean
}

export const Photo: React.FC<PropsType> = ({photo, isOwner}) => {

    const dispatch = useDispatch()

    const savePhotoHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhotoTC(e.target.files[0]))
        }
    }

    return (
        <div>
            <img className={styles.avatar} src={photo.large || ava} alt="avatar"/>
            {isOwner ? <div><input type="file" onChange={savePhotoHandle}/></div> : ''}
        </div>)
}