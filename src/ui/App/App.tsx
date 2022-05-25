import {useDispatch} from 'react-redux'
import React, {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
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
import {Preloader} from '../Preloader/Preloader'


export const App: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const {isInitialized} = useAppSelector(state => state.app)

    const {Header, Content, Footer, Sider} = Layout

    const items: MenuProps['items'] = [
        {
            key: PATH.PROFILE_PAGE,
            label: 'Profile',
            icon: <ProfileOutlined/>,
            onClick: () => navigate(PATH.PROFILE_PAGE),
        },
        {
            key: PATH.USERS_PAGE,
            label: 'Users',
            icon: <UsergroupDeleteOutlined/>,
            onClick: () => navigate(PATH.USERS_PAGE),
        },
        {
            key: PATH.DIALOGS_PAGE,
            label: 'Dialogs',
            icon: <MessageOutlined/>,
            onClick: () => navigate(PATH.DIALOGS_PAGE),
        },
        {
            key: PATH.NEWS_PAGE,
            label: 'News',
            icon: <ReadOutlined/>,
            onClick: () => navigate(PATH.NEWS_PAGE),
        },
        {
            key: PATH.MUSIC_PAGE,
            label: 'Music',
            icon: <CustomerServiceOutlined/>,
            onClick: () => navigate(PATH.MUSIC_PAGE),
        },
        {
            key: PATH.SETTINGS_PAGE,
            label: 'Settings',
            icon: <SettingOutlined/>,
            onClick: () => navigate(PATH.SETTINGS_PAGE),
        },
        {
            key: PATH.FRIENDS_PAGE,
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
        !isInitialized
            ? <Preloader/>
            : <Layout hasSider>
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
                    <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items}/>
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
    )
}

