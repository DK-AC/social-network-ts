import React from "react";
import styles from './profileInfo.module.css'

export const ProfileInfo = () => {
    return (
        <>
            <div className={styles.profileImage}>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div className={styles.profileDescription}>
                <div>
                    <img className={styles.avatar} src="https://www.blast.hk/attachments/64804/" alt="avatar"/>
                </div>
                ava + description
            </div>
        </>
    )
}