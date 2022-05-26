import React, {FC} from 'react'

import styles from './profileInfo.module.css'

type PropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: FC<PropsType> = ({contactValue, contactTitle}) => {
    return <div className={styles.contact}><b>{contactTitle}: </b>{contactValue}</div>
}