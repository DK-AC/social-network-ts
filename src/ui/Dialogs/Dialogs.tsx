import React, {ChangeEvent, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {sendMessageAC, updateNewMessageAC} from '../../redux/reducers/dialogsReducer';
import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';

import styles from './dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {MessageItem} from './MessageItem/MessageItem';


export const Dialogs: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const dialogs = useAppSelector(state => state.dialogs.dialogs);
    const messages = useAppSelector(state => state.dialogs.messages);
    const newMessageText = useAppSelector(state => state.dialogs.newMessageText);
    const isInitialized = useAppSelector(state => state.auth.isInitialized);

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>;
    });

    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>;
    });

    const sendMessageHandle = () => {
        dispatch(sendMessageAC(newMessageText));
    };
    const updateNewMessageTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewMessageAC(e.currentTarget.value));
    };

    useEffect(() => {
        if (!isInitialized) {
            navigate(PATH.LOGIN_PAGE)
        }
    }, [isInitialized])


    return (
        <>
            <div className={styles.dialogs}>
                <div className={styles.dialogsItem}>
                    {dialog}
                </div>
                <div className={styles.messages}>
                    {message}
                    <input type="text" value={newMessageText} onChange={updateNewMessageTextHandle}/>
                    <button onClick={sendMessageHandle}>add message</button>
                </div>
            </div>
        </>
    );
};

