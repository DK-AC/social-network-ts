import React from "react";
import styles from './profileInfo.module.css'
import {ProfileUserType} from "../../../api/profileAPI";
import {Preloader} from "../../Preloader/Preloader";
import select from '../../../assets/img/select.png'

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
                    <img className={styles.avatar} src={'user.photos.small'}
                         alt="avatar"/>
                </div>
                <h2>
                    {user ? user.fullName : ''}
                </h2>
                <div>
                    {user ? user.aboutMe : ''}
                </div>
                <div>
                    {user.lookingForAJob
                        ? <div>
                            <b>lookingForAJob? </b>
                            <img className={styles.select} src={select} alt=""/>
                        </div>
                        : ''}
                </div>
                <div>
                    {user.lookingForAJobDescription}
                </div>
            </div>
        </>
    )
}