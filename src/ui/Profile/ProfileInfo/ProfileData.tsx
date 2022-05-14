import React from 'react';

import {ProfileUserType} from '../../../api/profileAPI';

import {FullName} from './FullName';
import {LookingForAJob} from './LookingForAJob';
import {AboutMe} from './AboutMe';
import {Contacts} from './Contacts';

type PropsType = {
    profile: ProfileUserType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData: React.FC<PropsType> = ({profile, isOwner, goToEditMode}) => {
    return (
        <>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <FullName fullName={profile.fullName}/>
            <LookingForAJob lookingForAJob={profile.lookingForAJob}
                            lookingForAJobDescription={profile.lookingForAJobDescription}
            />
            <AboutMe aboutMe={profile.aboutMe}/>
            <Contacts contacts={Object.keys(profile.contacts)}/>
        </>)
}