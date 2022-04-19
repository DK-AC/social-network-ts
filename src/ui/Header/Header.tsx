import React, {useEffect} from 'react';
import styles from './header.module.css'
import {useAppSelector} from "../../redux/store";
import {useDispatch} from "react-redux";
import {authMeTC, loginTC} from "../../redux/reducers/authReducer";

export const Header = () => {

    const dispatch = useDispatch()

    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)

    useEffect(() => {
    }, [])


    const loggedInHandle = () => {
      dispatch(loginTC({email:'denkacaj@gmail.com',password:'zxcnbvasdqwe123'}))
    }

    return (
        <header className={styles.header}>
            <img className={styles.logo}
                 src="https://lh3.googleusercontent.com/a-/AOh14Ggy8_OSY8VRciCDIW_ZvzviDGM26X33SG0K0TrlqQ=s600-k-no-rp-mo"
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

