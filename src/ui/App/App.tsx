import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';

import {Header} from '../Header/Header';
import {Navbar} from '../Navbar/Navbar';
import {Routing} from '../Routing/Routing';
import {authMeTC} from '../../redux/reducers/authReducer';

import styles from './App.module.css';


export const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authMeTC());
    }, []);

    return (
        <div className={styles.appWrapper}><Header/>
            <Navbar/>
            <div className={styles.appWrapperContent}>
                <Routing/>
            </div>
        </div>
    );
};

