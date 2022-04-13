import React from 'react';
import {FriendItem} from "./FriendItem/FriendItem";
import styles from "./friends.module.css";
import {FriendDataType} from "../../redux/reducers/sideBarReducer";

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


