import React from 'react';

import {ContactsUserType} from '../../../api/profileAPI';

import {Contact} from './Contact';

type PropsType = {
    contacts: ContactsUserType
}

export const Contacts: React.FC<PropsType> = ({contacts}) => {
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
    );
};

