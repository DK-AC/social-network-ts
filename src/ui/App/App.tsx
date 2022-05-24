import {useDispatch} from 'react-redux'
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout, Menu, MenuProps} from 'antd'
import {
    CustomerServiceOutlined,
    MessageOutlined,
    ProfileOutlined,
    SettingOutlined,
    TeamOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons'

import {PATH} from '../Routing/Routing'
import {authMe} from '../../redux/reducers/authReducer'
import {useAppSelector} from '../../redux/store'

import './App.css'


export const App: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    const {Header, Content, Footer, Sider} = Layout

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Profile',
            icon: <ProfileOutlined/>,
        },
        {
            key: '2',
            label: 'Users',
            icon: <UsergroupDeleteOutlined/>,
        },
        {
            key: '3',
            label: 'Dialogs',
            icon: <MessageOutlined/>,
        },
        {
            key: '4',
            label: 'News',
            icon: <MessageOutlined/>,
        },
        {
            key: '5',
            label: 'Music',
            icon: <CustomerServiceOutlined/>,
        },
        {
            key: '6',
            label: 'Settings',
            icon: <SettingOutlined/>,
        },
        {
            key: '7',
            label: 'Friends',
            icon: <TeamOutlined/>,
        },
    ]

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])


    useEffect(() => {
        if (isInitialized && !isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
        return
    }, [isAuth, isInitialized, navigate])

    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items}/>
            </Sider>
            <Layout className="site-layout" style={{marginLeft: 200}}>
                {/*<Header/>*/}
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
        // <div className={'App'}>
        //     {!isInitialized
        //         ? <Preloader/>
        //         : <div className={styles.appWrapper}>
        //             <Header/>
        //             <Navbar/>
        //             <div className={styles.appWrapperContent}>
        //                 <Routing/>
        //             </div>
        //         </div>}
        //
        // </div>
    )
}

