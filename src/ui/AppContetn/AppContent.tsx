import React from 'react'

import {Content} from 'antd/es/layout/layout'

import {Routing} from '../Routing/Routing'

export const AppContent: React.FC = () => {
    return (
        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div className="site-layout-background" style={{padding: 24}}>
                <Routing/>
            </div>
        </Content>
    )
}

