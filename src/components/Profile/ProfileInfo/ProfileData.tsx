import {FC} from 'react'
import {EditOutlined} from '@ant-design/icons'
import {Button} from 'antd'

import {ProfileUserType} from '../../../types'
import {getAppError, useAppSelector} from '../../../store'
import {ErrorMessage} from '../../common'

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

    const error = useAppSelector(getAppError)

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
            {error && <ErrorMessage/>}
        </>)
}