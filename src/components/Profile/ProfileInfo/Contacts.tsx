import {FC} from 'react'

import {ContactsUserType} from 'types'

import {Contact} from './Contact'

import styles from './Contacts.module.css'

type PropsType = {
    contacts: ContactsUserType
}

export const Contacts: FC<PropsType> = ({contacts}) => {
    return (
        <div className={styles.wrapper}>
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

