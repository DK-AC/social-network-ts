import React from 'react'

import {Content} from 'antd/es/layout/layout'

import {Routing} from '../Routing/Routing'

import styles from './appContent.module.css'

export const AppContent: React.FC = () => {
    return (
        <Content className={styles.container}>
            <div className={`site-layout-background + ${styles.content}`}>
                <Routing/>
            </div>
        </Content>
    )
}

