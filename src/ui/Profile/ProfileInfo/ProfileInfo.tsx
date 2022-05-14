import React, {useState} from 'react';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';

import styles from './profileInfo.module.css';
import {Photo} from './Photo';
import {ProfileData} from './ProfileData';
import {ProfileDataForm} from './ProfileDataForm.';
import {Status} from './Status';

type PropsType = {
    profile: ProfileUserType | null
    isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({profile, isOwner}) => {

    const [editMode, setEditMode] = useState(false)

    const goToEditMode = () => {
        setEditMode(true)
    }

    if (!profile) {
        return <Preloader/>;
    }

    return (
        <>
            <div className={styles.profileDescription}>
                <Photo photo={profile.photos} isOwner={isOwner}/>
                {editMode
                    ? <ProfileDataForm/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode}/>

                }
                <Status/>
            </div>
        </>
    );
})

