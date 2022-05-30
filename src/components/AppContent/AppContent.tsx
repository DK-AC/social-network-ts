import React, {FC} from 'react'
import {Layout} from 'antd'

import {Routing} from '../Routing'

import styles from './appContent.module.css'

export const AppContent: FC = () => {

    const {Content} = Layout

    return (
        <Content className={styles.container}>
            <div className={`site-layout-background + ${styles.content}`}>
                <Routing/>
            </div>
        </Content>
    )
}
