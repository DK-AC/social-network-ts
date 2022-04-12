import React from 'react';
import {FriendDataType} from "../../redux/state";
import {FriendItem} from "./FriendItem/FriendItem";
import styles from "./friends.module.css";

type PropsType = { friends: FriendDataType[] }

export const Friends: React.FC<PropsType> = ({friends}) => {

    const friendsData = friends.map(f => {
        return <FriendItem key={f.id} id={f.id} name={f.name}/>
    })

    return (
        <div className={styles.friends}>
            {friendsData}
        </div>
    );
};


