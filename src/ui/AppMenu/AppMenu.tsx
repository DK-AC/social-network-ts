import {Menu, MenuProps} from 'antd'

import {
    CustomerServiceOutlined,
    MessageOutlined,
    ProfileOutlined,
    ReadOutlined,
    SettingOutlined,
    TeamOutlined,
    UsergroupDeleteOutlined,
} from '@ant-design/icons'
import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {PATH} from '../Routing/Routing'


export const AppMenu: React.FC = () => {

    const navigate = useNavigate()
    const location = useLocation()

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

    return <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items}/>
}


