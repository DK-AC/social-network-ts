import React, {FC} from 'react'

import styles from './notFound404.module.css'

export const NotFound404: FC = () => {
    return (
        <div className={styles.center}>
            <h2>404</h2>
            <h3>Page not found</h3>
        </div>
    )
}

