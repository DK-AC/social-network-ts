import React from 'react';
import styles from './profile.module.css'
import {Posts} from "./Posts/Posts";


export const Profile = () => {
    return (
        <div className={styles.profile}>
            <div>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div>
                ava + description
            </div>
            <Posts/>
        </div>
    );
};