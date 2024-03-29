import React, {FC, useState} from 'react'

import {Nullable, ProfileUserType} from 'types'

import {Preloader} from '../../Preloader'

import styles from './profileInfo.module.css'
import {Photo} from './Photo'
import {ProfileData} from './ProfileData'
import {ProfileDataForm} from './ProfileDataForm.'
import {Status} from './Status'

type PropsType = {
    profile: Nullable<ProfileUserType>
    isOwner: boolean
}

export const ProfileInfo: FC<PropsType> = React.memo(({profile, isOwner}) => {

    const [editMode, setEditMode] = useState(false)

    const goToEditMode = () => setEditMode(true)
    const goToSaveMode = () => setEditMode(false)

    if (!profile) {
        return <Preloader />
    }

    return (
        <>
            <div >
                <Photo photo={profile.photos} isOwner={isOwner} />
                <div className={styles.profileDescription}>{editMode
                    ? <ProfileDataForm profile={profile} goToSaveMode={goToSaveMode} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode} />
                }
                </div>
                <Status />
            </div>
        </>
    )
})

