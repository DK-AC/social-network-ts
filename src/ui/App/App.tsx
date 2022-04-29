import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {Header} from '../Header/Header';
import {Navbar} from '../Navbar/Navbar';
import {PATH, Routing} from '../Routing/Routing';
import {authMeTC} from '../../redux/reducers/authReducer';
import {useAppSelector} from '../../redux/store';

import styles from './App.module.css';

export const App: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAuth = useAppSelector(state => state.auth.isAuth)

    useEffect(() => {
        if (!isAuth) {
            dispatch(authMeTC());
            navigate(PATH.LOGIN_PAGE)
        }
        return
    }, [isAuth]);

    return (
        <div className={styles.appWrapper}>
            <Header/>
            <Navbar/>
            <div className={styles.appWrapperContent}>
                <Routing/>
            </div>
        </div>
    );
};

