import React from 'react';

type PropsType = {
    aboutMe: string
}

export const AboutMe: React.FC<PropsType> = ({aboutMe}) => {
    return <div><b>About me: </b>{aboutMe}</div>
}