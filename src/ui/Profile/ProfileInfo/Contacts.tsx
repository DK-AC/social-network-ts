import React from 'react';

import {Contact} from './Contact';

type PropsType = {
    contacts: string[]
}

export const Contacts: React.FC<PropsType> = ({contacts}) => {
    return (
        <div>
            <b>Contacts: </b>{
            contacts.map(key => <Contact key={key} contactTitle={key} contactValue={''}/>)}
        </div>
    );
};

