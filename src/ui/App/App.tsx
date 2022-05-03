import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Header} from '../Header/Header';
import {Navbar} from '../Navbar/Navbar';
import {PATH, Routing} from '../Routing/Routing';
import {authMeTC} from '../../redux/reducers/authReducer';
import {useAppSelector} from '../../redux/store';
import {Preloader} from '../Preloader/Preloader';

import styles from './App.module.css';

export const App: React.FC = () => {

    console.log('APP:', App)
    console.log('APP:', App)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(authMeTC());
    }, [dispatch])


    useEffect(() => {
        if (isInitialized && !isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
        return
    }, [isAuth, isInitialized, navigate]);

    return !isInitialized ? <Preloader/> :

        (
            <div className={styles.appWrapper}>
                <Header/>
                <Navbar/>
                <div className={styles.appWrapperContent}>
                    <Routing/>
                </div>
            </div>
        );
};

