import React from "react";
import styles from './profileInfo.module.css'
import {ProfileUserType} from "../../../api/profileAPI";
import {Preloader} from "../../Preloader/Preloader";

type PropsType = {
    user: ProfileUserType
}


export const ProfileInfo: React.FC<PropsType> = ({user}) => {

    if (!user) {
        return <Preloader/>
    }

    return (
        <>
            <div className={styles.profileImage}>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div className={styles.profileDescription}>
                <div>
                    <img className={styles.avatar} src={"user.photos.small ? user.photos.small : avaImg"} alt="avatar"/>
                </div>
                ava + description
            </div>
        </>
    )
}