import React from 'react';

import {ProfileUserType} from '../../../api/profileAPI';

import {FullName} from './FullName';
import {LookingForAJob} from './LookingForAJob';
import {AboutMe} from './AboutMe';
import {Contacts} from './Contacts';
import {Status} from './Status';

type PropsType = {
    profile: ProfileUserType
}

export const ProfileData: React.FC<PropsType> = ({profile}) => {
    return (
        <>
            <FullName fullName={profile.fullName}/>
            <LookingForAJob lookingForAJob={profile.lookingForAJob}
                            lookingForAJobDescription={profile.lookingForAJobDescription}
            />
            <AboutMe aboutMe={profile.aboutMe}/>
            <Contacts contacts={Object.keys(profile.contacts)}/>
            <Status/>
        </>)
}