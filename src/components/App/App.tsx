import {useDispatch} from 'react-redux'
import React, {FC, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout} from 'antd'

import './App.css'
import {authMe, getAppIsInitialized, getIsAuth, useAppSelector} from 'store'

import {Path} from 'enum'

import logo from 'assets/img/logoDK.svg'

import {Header} from '../Header'
import {AppMenu} from '../AppMenu'
import {AppContent} from '../AppContent'
import {Login} from '../Login'

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

    }, [isAuth, isInitialized, navigate])

    if (!isAuth) {
        return <Login />
    }

    return (
        <Layout hasSider>
            <Sider breakpoint="lg" collapsedWidth="70" className={styles.wrapper}>
                <img src={logo} className={styles.logo} alt="logo" />
                <AppMenu />
            </Sider>
            <Layout>
                <Header />
                <AppContent />
                <Footer className={styles.textCenter}>
                    Social Network ©2022 Created by Denis Katsai
                </Footer>
            </Layout>
        </Layout>
    )
}

