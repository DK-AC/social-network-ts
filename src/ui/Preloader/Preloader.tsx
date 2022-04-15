import React from 'react';
import preloader from './../../assets/img/Circle-Preloaders.svg'
import styles from './preloader.module.css'

export const Preloader = () => {
    return (
        <div >
            <img className={styles.preloader} src={preloader} alt="preloader"/>
        </div>
    );
};

