import React, {FC} from 'react'

type PropsType = {
    aboutMe: string
}

export const AboutMe: FC<PropsType> = ({aboutMe}) => {
    return <div><b>About me: </b>{aboutMe}</div>
}