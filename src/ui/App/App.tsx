import {useDispatch} from 'react-redux'
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout} from 'antd'

import {useAppSelector} from '../../redux/store'
import {PATH} from '../Routing/Routing'
import {authMe} from '../../redux/reducers/authReducer'

import './App.css'
import {Preloader} from '../Preloader/Preloader'
import {AppHeader} from '../AppHeader/AppHeader'
import {AppMenu} from '../AppMenu/AppMenu'

import {AppContent} from '../AppContetn/AppContent'

import styles from './App.module.css'


export const App: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const {isInitialized} = useAppSelector(state => state.app)

    const {Footer, Sider} = Layout


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
                <Sider className={styles.sider}>
                    <AppMenu/>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <AppHeader/>
                    <AppContent/>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
    )
}

