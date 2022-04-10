import React from "react";
import styles from './profileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <>
            <div>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div className={styles.profileDescription}>ava + description</div>
        </>
    )
}