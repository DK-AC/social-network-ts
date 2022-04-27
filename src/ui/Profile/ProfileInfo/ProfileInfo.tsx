import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';
import select from '../../../assets/img/select.png';
import ava from '../../../assets/img/client-2-512.webp';
import {getProfileUserStatusTC, updateProfileUserStatusTC} from '../../../redux/reducers/profileReducer';
import {useAppSelector} from '../../../redux/store';

import styles from './profileInfo.module.css';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';

type PropsType = {
    user: ProfileUserType | null
}

export const ProfileInfo: React.FC<PropsType> = ({user}) => {

    const dispatch = useDispatch()

    const status = useAppSelector(state => state.profile.status)

    const updateStatus = (status: string) => {
        dispatch(updateProfileUserStatusTC(status))
    }

    useEffect(() => {
        if (user) {
            dispatch(getProfileUserStatusTC(user.userId))
        }
    }, [])

    if (!user) {
        return <Preloader/>;
    }

    return (
        <>
            <div className={styles.profileImage}>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div className={styles.profileDescription}>
                <div>
                    <img className={styles.avatar}
                         src={user.photos.small ? user.photos.small : ava}
                         alt="avatar"
                    />
                </div>
                <h2>{user ? user.fullName : ''}</h2>
                <div>{user ? user.aboutMe : ''}</div>
                {status && <ProfileStatus status={status} updateStatus={updateStatus}/>}
                <div>
                    {user.lookingForAJob
                        ? <div>
                            <b>lookingForAJob? </b>
                            <img className={styles.select} src={select} alt="select"/>
                        </div>
                        : ''}
                </div>
                <div>
                    {user.lookingForAJobDescription}
                </div>
            </div>
        </>
    );
};