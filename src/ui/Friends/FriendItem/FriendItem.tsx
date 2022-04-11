import styles from "./friendItem.module.css";
import React from "react";

type PropsType = { id: number, name: string }

export const FriendItem = ({id, name}: PropsType) => {
    return (
        <div>
            <span className={styles.friendItem}>
                <img
                    src="https://st4.depositphotos.com/1001248/29463/v/600/depositphotos_294631336-stock-illustration-user-sign-flat-related-vector.jpg"
                    alt="friend"/>
                {name}
            </span>
        </div>
    )
}