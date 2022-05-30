import React, {FC} from 'react'

type PropsType = {
    fullName: string
}

export const FullName: FC<PropsType> = ({fullName}) => {
    return <div><b>Full name: </b> {fullName}</div>
}