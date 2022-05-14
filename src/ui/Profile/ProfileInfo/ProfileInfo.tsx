import React, {ChangeEvent} from 'react';
import {useDispatch} from 'react-redux';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';
import ava from '../../../assets/img/client-2-512.webp';
import {savePhotoTC} from '../../../redux/reducers/profileReducer';

import styles from './profileInfo.module.css';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import {Contact} from './Contact/Contact';

type PropsType = {
    user: ProfileUserType | null
    isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({user, isOwner}) => {

    const dispatch = useDispatch()

    const savePhotoHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(savePhotoTC(e.target.files[0]))
        }
    }

    if (!user) {
        return <Preloader/>;
    }

    return (
        <>
            <div className={styles.profileDescription}>
                <div>
                    <img className={styles.avatar}
                         src={user.photos.large || ava}
                         alt="avatar"
                    />
                    {isOwner ? <div><input type="file" onChange={savePhotoHandle}/></div> : ''}
                </div>
                <div><b>Full name: </b> {user ? user.fullName : ''}</div>
                <div><b>Looking for a job: </b>{user.lookingForAJob ? 'Yes' : 'No'}</div>
                <div>{user.lookingForAJobDescription}</div>
                <div><b>About me: </b>{user ? user.aboutMe : ''}</div>
                <div><b>Contacts: </b>{Object.keys(user.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={''}/>
                })}</div>
                <ProfileStatus/>
            </div>
        </>
    );
})

