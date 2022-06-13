import {useDispatch} from 'react-redux'
import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout} from 'antd'

import './App.css'
import {Header} from '../Header'
import {AppMenu} from '../AppMenu'
import {AppContent} from '../AppContent'
import {Login} from '../Login'
import {Path} from '../../enum'
import {authMe, getAppIsInitialized, getIsAuth, useAppSelector} from '../../store'

import styles from './App.module.css'


export const App: FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)
    const isInitialized = useAppSelector(getAppIsInitialized)

    const {Footer, Sider} = Layout

    useEffect(() => {
        dispatch(authMe())
    }, [dispatch])


    useEffect(() => {
        if (isInitialized && !isAuth) {
            navigate(Path.LOGIN_PAGE)
        }
        return
    }, [isAuth, isInitialized, navigate])

    return (
        !isAuth
            ? <Login/>
            : <Layout hasSider>
                <Sider className={styles.sider}>
                    <AppMenu/>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Header/>
                    <AppContent/>
                    <Footer style={{textAlign: 'center'}}>Social Network ©2022 Created by Denis Katsai</Footer>
                </Layout>
            </Layout>
    )
}

