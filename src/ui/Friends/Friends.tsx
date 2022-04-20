import React from 'react';
import {FriendItem} from './FriendItem/FriendItem';
import styles from './friends.module.css';
import {useAppSelector} from '../../redux/store';


export const Friends: React.FC = () => {

    const friends = useAppSelector(state => state.sideBar.friends)

    const friendsData = friends.map(f => {
        return <FriendItem key={f.id} id={f.id} name={f.name}/>
    })

    return (
        <div className={styles.friends}>
            {friendsData}
        </div>
    );
};


