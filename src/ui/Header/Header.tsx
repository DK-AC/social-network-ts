import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../redux/store';
import {loginTC} from '../../redux/reducers/authReducer';

import styles from './header.module.css';
import logoDK from './../../assets/img/logoDK.svg';

export const Header = () => {
    console.log(`операция`)
    console.log(Header)
    const dispatch = useDispatch();

    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized);

    const loggedInHandle = () => {
        dispatch(loginTC({email: 'denkacaj@gmail.com', password: 'zxcnbvasdqwe123'}));
    };

    useEffect(() => {
    }, []);

    return (
        <header className={styles.header}>
            <img className={styles.logo}
                 src={logoDK}
                 alt="logo"/>
            {isInitialized ?
                <img className={styles.initializedUser}
                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                     alt="initializedUser"
                />
                : <button className={styles.initializedUser} onClick={loggedInHandle}>sign in</button>}

        </header>
    );
};

