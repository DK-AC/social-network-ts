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
    const {fullName, lookingForAJobDescription, lookingForAJob, contacts, aboutMe} = profile
    //
    // useEffect(() => {
    //     setProfileUserTC(profile.userId)
    // }, [profile.userId, profileTest!.fullName])

    return (
        <>
            {isOwner && <div>
                <button onClick={goToEditMode}>edit</button>
            </div>}
            <FullName fullName={fullName}/>
            <LookingForAJob lookingForAJob={lookingForAJob}
                            lookingForAJobDescription={lookingForAJobDescription}
            />
            <AboutMe aboutMe={aboutMe}/>
            <Contacts contacts={contacts}/>
        </>)
}