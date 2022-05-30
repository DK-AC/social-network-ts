import {useDispatch} from 'react-redux'
import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout} from 'antd'

import {useAppSelector} from '../../store/store'
import {authMe} from '../../store'
import './App.css'
import {Header} from '../Header'
import {AppMenu} from '../AppMenu'
import {AppContent} from '../AppContent'
import {Login} from '../Login'
import {getIsAuth} from '../../store'
import {getAppIsInitialized} from '../../store'

import {Paths} from '../../enum'

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
            navigate(Paths.LOGIN_PAGE)
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
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
    )
}

