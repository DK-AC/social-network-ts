import {useDispatch} from 'react-redux'
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout, Menu, MenuProps} from 'antd'
import {
    CustomerServiceOutlined,
    MessageOutlined,
    ProfileOutlined,
    ReadOutlined,
    SettingOutlined,
    TeamOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons'

import {useAppSelector} from '../../redux/store'
import {PATH, Routing} from '../Routing/Routing'
import {authMe} from '../../redux/reducers/authReducer'

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
            onClick: () => navigate(PATH.PROFILE_PAGE),
        },
        {
            key: '2',
            label: 'Users',
            icon: <UsergroupDeleteOutlined/>,
            onClick: () => navigate(PATH.USERS_PAGE),
        },
        {
            key: '3',
            label: 'Dialogs',
            icon: <MessageOutlined/>,
            onClick: () => navigate(PATH.DIALOGS_PAGE),
        },
        {
            key: '4',
            label: 'News',
            icon: <ReadOutlined/>,
            onClick: () => navigate(PATH.NEWS_PAGE),
        },
        {
            key: '5',
            label: 'Music',
            icon: <CustomerServiceOutlined/>,
            onClick: () => navigate(PATH.MUSIC_PAGE),
        },
        {
            key: '6',
            label: 'Settings',
            icon: <SettingOutlined/>,
            onClick: () => navigate(PATH.SETTINGS_PAGE),
        },
        {
            key: '7',
            label: 'Friends',
            icon: <TeamOutlined/>,
            onClick: () => navigate(PATH.FRIENDS_PAGE),
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
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div className="site-layout-background" style={{padding: 24}}>
                        <Routing/>
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

