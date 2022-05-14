import React from 'react';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';

import styles from './profileInfo.module.css';
import {Status} from './Status';
import {Contact} from './Contact';
import {Photo} from './Photo';
import {FullName} from './FullName';
import {LookingForAJob} from './LookingForAJob';
import {AboutMe} from './AboutMe';
import {Contacts} from './Contacts';

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
                <LookingForAJob lookingForAJob={user.lookingForAJob}
                                lookingForAJobDescription={user.lookingForAJobDescription}
                />
                <AboutMe aboutMe={user.aboutMe}/>
                <Contacts contacts={Object.keys(user.contacts)}/>
                <Status/>
            </div>
        </>
    );
})

