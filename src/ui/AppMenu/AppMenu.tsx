import {Menu, MenuProps} from 'antd'
import {
    CustomerServiceOutlined,
    MessageOutlined,
    ProfileOutlined,
    ReadOutlined,
    SettingOutlined,
    TeamOutlined,
    UsergroupDeleteOutlined, WechatOutlined,
} from '@ant-design/icons'
import React, {FC} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

import {Paths} from '../../enum'


export const AppMenu: FC = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const items: MenuProps['items'] = [
        {
            key: Paths.PROFILE_PAGE,
            label: 'Profile',
            icon: <ProfileOutlined/>,
            onClick: () => navigate(Paths.PROFILE_PAGE),
        },
        {
            key: Paths.USERS_PAGE,
            label: 'Users',
            icon: <UsergroupDeleteOutlined/>,
            onClick: () => navigate(Paths.USERS_PAGE),
        },
        {
            key: Paths.DIALOGS_PAGE,
            label: 'Dialogs',
            icon: <WechatOutlined/>,
            onClick: () => navigate(Paths.DIALOGS_PAGE),
        },
        {
            key: Paths.NEWS_PAGE,
            label: 'News',
            icon: <ReadOutlined/>,
            onClick: () => navigate(Paths.NEWS_PAGE),
        },
        {
            key: Paths.MUSIC_PAGE,
            label: 'Music',
            icon: <CustomerServiceOutlined/>,
            onClick: () => navigate(Paths.MUSIC_PAGE),
        },
        {
            key: Paths.FRIENDS_PAGE,
            label: 'Friends',
            icon: <TeamOutlined/>,
            onClick: () => navigate(Paths.FRIENDS_PAGE),
        },
        {
            key: Paths.SETTINGS_PAGE,
            label: 'Settings',
            icon: <SettingOutlined/>,
            onClick: () => navigate(Paths.SETTINGS_PAGE),
        },
        {
            key: Paths.CHAT_PAGE,
            label: 'Chat',
            icon: <MessageOutlined />,
            onClick: () => navigate(Paths.CHAT_PAGE),
        },

    ]

    return <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items}/>
}

