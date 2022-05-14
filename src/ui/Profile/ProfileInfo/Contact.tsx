import React from 'react';

import styles from './profileInfo.module.css';

type PropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<PropsType> = ({contactValue, contactTitle}) => {
    return <div className={styles.contact}><b>{contactTitle}: </b>{contactValue}</div>
}