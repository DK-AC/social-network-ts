import React, {FC} from 'react'
import {EditOutlined} from '@ant-design/icons'
import {Button} from 'antd'

import {ProfileUserType} from '../../../api/profileAPI'

import {FullName} from './FullName'
import {LookingForAJob} from './LookingForAJob'
import {AboutMe} from './AboutMe'
import {Contacts} from './Contacts'

type PropsType = {
    profile: ProfileUserType
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData: FC<PropsType> = ({profile, isOwner, goToEditMode}) => {
    const {fullName, lookingForAJobDescription, lookingForAJob, contacts, aboutMe} = profile

    return (
        <>
            {isOwner && <div>
                <Button onClick={goToEditMode} icon={<EditOutlined/>} size={'small'}> Edit</Button>
            </div>}
            <FullName fullName={fullName}/>
            <LookingForAJob lookingForAJob={lookingForAJob}
                            lookingForAJobDescription={lookingForAJobDescription}
            />
            <AboutMe aboutMe={aboutMe}/>
            <Contacts contacts={contacts}/>
        </>)
}