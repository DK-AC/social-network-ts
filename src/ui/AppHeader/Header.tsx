import React from 'react'
import {useDispatch} from 'react-redux'

import {Avatar, Layout} from 'antd'

import {UserOutlined} from '@ant-design/icons'

import {useAppSelector} from '../../redux/store'
import {logout} from '../../redux/reducers/authReducer'


export const Header = () => {

    const dispatch = useDispatch()

    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)

    const {Header} = Layout

    const logoutHandle = () => {
        dispatch(logout())
    }

    return (
        <Header className="site-layout-background" style={{padding: 0}}>
            <div className="logo" style={{float: 'right', paddingRight: '10px'}}>
                <Avatar src={''} size="large" icon={<UserOutlined/>}/>
            </div>
        </Header>
        // <header className={styles.header}>
        //     <img className={styles.logo}
        //          src={logoDK}
        //          alt="logo"/>
        //     {isAuth && <span>
        //         <img className={styles.initializedUser}
        //              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        //              alt="initializedUser"
        //         />
        //         <button className={styles.button} onClick={logoutHandle}> log out</button>
        //     </span>
        //     }
        // </header>
    )
}

