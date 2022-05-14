import React from 'react';

type PropsType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
}

export const LookingForAJob: React.FC<PropsType> = ({lookingForAJob, lookingForAJobDescription}) => {
    return (
        <div>
            <div><b>Looking for a job: </b>{lookingForAJob ? 'Yes' : 'No'}</div>
            {lookingForAJob
                ? <div><b>Looking for a job description: </b> {lookingForAJobDescription}</div>
                : ''}
        </div>)
}