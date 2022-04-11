import React from 'react';
import {FriendsDataType} from "../../redux/state";
import {FriendItem} from "./FriendItem/FriendItem";
import styles from "./friends.module.css";

type PropsType = { friends: FriendsDataType[] }

export const Friends = ({friends}: PropsType) => {

    const friendsData = friends.map(f => {
        return <FriendItem key={f.id} id={f.id} name={f.name}/>
    })

    return (
        <div className={styles.friends}>
            {friendsData}
        </div>
    );
};


