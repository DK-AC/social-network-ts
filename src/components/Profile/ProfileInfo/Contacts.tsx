import React, {FC} from 'react'

import {Contact} from './Contact'
import {ContactsUserType} from '../../../types/profile'

type PropsType = {
    contacts: ContactsUserType
}

export const Contacts: FC<PropsType> = ({contacts}) => {
    return (
        <div>
            <b>Contacts: </b>{
            Object
                .keys(contacts)
                .map
                (key => {
                    return <Contact key={key}
                                    contactTitle={key}
                                    contactValue={contacts[key as keyof ContactsUserType]}
                    />
                })}
        </div>
    )
}

