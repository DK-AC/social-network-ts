import {useDispatch} from 'react-redux'
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Layout} from 'antd'

import {useAppSelector} from '../../redux/store'
import {PATH} from '../Routing/Routing'
import {authMe} from '../../redux/reducers/authReducer'

import './App.css'
import {Preloader} from '../Preloader/Preloader'
import {Header} from '../AppHeader/Header'
import {AppMenu} from '../AppMenu/AppMenu'

import {Content} from '../AppContent/Content'

import {Login} from '../Login/Login'

import {getIsAuth} from '../../selectors/authSelectors'

import styles from './App.module.css'


export const App: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(getIsAuth)
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
        !isAuth
            ? <Login/>
            : <Layout hasSider>
                <Sider className={styles.sider}>
                    <AppMenu/>
                </Sider>
                <Layout className="site-layout" style={{marginLeft: 200}}>
                    <Header/>
                    <Content/>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
    )
}

