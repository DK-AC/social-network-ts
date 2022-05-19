import React from 'react'

type PropsType = {
    fullName: string
}

export const FullName: React.FC<PropsType> = ({fullName}) => {
    return <div><b>Full name: </b> {fullName}</div>
}