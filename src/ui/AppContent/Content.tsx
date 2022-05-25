import React from 'react'
import {Layout} from 'antd'

import {Routing} from '../Routing/Routing'

import styles from './content.module.css'
export const Content: React.FC = () => {

    const {Content} = Layout

    return (
        <Content className={styles.container}>
            <div className={`site-layout-background + ${styles.content}`}>
                <Routing/>
            </div>
        </Content>
    )
}

//<header className="Login-header">
//                 <img src={'logo'} className="App-logo" alt="logo" />
//                 <Spin spinning={true}></Spin>
//
//                 <Form
//                     name="normal_login"
//                     className="login-form"
//                     onFinish={onFinish}>
//                     <Form.Item
//                         name="username"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your Username!',
//                             },
//                         ]}>
//                         <Input prefix={<UserOutlined className="site-form-item-icon" />}
//                                placeholder="Username" />
//                     </Form.Item>
//                     <Form.Item
//                         name="password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your Password!',
//                             },
//                         ]}>
//                         <Input
//                             prefix={<LockOutlined className="site-form-item-icon" />}
//                             type="password"
//                             placeholder="Password"
//                         />
//                     </Form.Item>
//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" className="login-form-button">
//                             Log in
//                         </Button>
//
//                     </Form.Item>
//                 </Form>
//             </header>
