import React, {useState} from 'react';

import {ProfileUserType} from '../../../api/profileAPI';
import {Preloader} from '../../Preloader/Preloader';

import styles from './profileInfo.module.css';
import {Photo} from './Photo';
import {ProfileData} from './ProfileData';

type PropsType = {
    profile: ProfileUserType | null
    isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({profile, isOwner}) => {

    const [editMode, setEditMode] = useState(isOwner)

    const goToEditModeHandle = () => {
        setEditMode(!editMode)
    }

    if (!profile) {
        return <Preloader/>;
    }

    return (
        <>
            <div className={styles.profileDescription}>
                <Photo photo={profile.photos} isOwner={isOwner}/>
                {editMode ? <button onClick={goToEditModeHandle}>edit</button> : ''}
                <ProfileData profile={profile}/>
            </div>
        </>
    );
})

