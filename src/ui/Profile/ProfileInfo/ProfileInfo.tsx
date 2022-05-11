import React from 'react';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';
import select from '../../../assets/img/select.png';
import ava from '../../../assets/img/client-2-512.webp';

import styles from './profileInfo.module.css';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';

type PropsType = {
    user: ProfileUserType | null
    isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({user, isOwner}) => {

    if (!user) {
        return <Preloader/>;
    }

    return (
        <>
            <div className={styles.profileDescription}>
                <div>
                    <img className={styles.avatar}
                         src={user.photos.small ? user.photos.small : ava}
                         alt="avatar"
                    />
                    {isOwner ? <div><input type="file"/></div> : ''}
                </div>
                <h2>{user ? user.fullName : ''}</h2>
                <div>{user ? user.aboutMe : ''}</div>
                <ProfileStatus/>
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
})