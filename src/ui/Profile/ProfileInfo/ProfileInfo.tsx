import React from 'react';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';

import styles from './profileInfo.module.css';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import {Contact} from './Contact/Contact';
import {Photo} from './Photo/Photo';
import {FullName} from './FullName/FullName';

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
                <Photo photo={user.photos} isOwner={isOwner}/>
                <FullName fullName={user.fullName}/>
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

