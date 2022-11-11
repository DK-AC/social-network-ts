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

import {Path} from 'enum'


export const AppMenu: FC = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const items: MenuProps['items'] = [
        {
            key: Path.PROFILE_PAGE,
            label: 'Profile',
            icon: <ProfileOutlined/>,
            onClick: () => navigate(Path.PROFILE_PAGE),
        },
        {
            key: Path.USERS_PAGE,
            label: 'Users',
            icon: <UsergroupDeleteOutlined/>,
            onClick: () => navigate(Path.USERS_PAGE),
        },
        {
            key: Path.DIALOGS_PAGE,
            label: 'Dialogs',
            icon: <WechatOutlined/>,
            onClick: () => navigate(Path.DIALOGS_PAGE),
        },
        {
            key: Path.NEWS_PAGE,
            label: 'News',
            icon: <ReadOutlined/>,
            onClick: () => navigate(Path.NEWS_PAGE),
        },
        {
            key: Path.MUSIC_PAGE,
            label: 'Music',
            icon: <CustomerServiceOutlined/>,
            onClick: () => navigate(Path.MUSIC_PAGE),
        },
        {
            key: Path.FRIENDS_PAGE,
            label: 'Friends',
            icon: <TeamOutlined/>,
            onClick: () => navigate(Path.FRIENDS_PAGE),
        },
        {
            key: Path.SETTINGS_PAGE,
            label: 'Settings',
            icon: <SettingOutlined/>,
            onClick: () => navigate(Path.SETTINGS_PAGE),
        },
        {
            key: Path.CHAT_PAGE,
            label: 'Chat',
            icon: <MessageOutlined />,
            onClick: () => navigate(Path.CHAT_PAGE),
        },

    ]

    return <Menu  theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items}/>
}

