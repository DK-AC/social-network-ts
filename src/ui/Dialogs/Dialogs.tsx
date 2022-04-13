import React, {ChangeEvent} from 'react';
import styles from './dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import {ActionsType, sendMessageAC, DialogsPageType, updateNewMessageAC} from "../../redux/state";

type PropsType = {
    dialogsPage: DialogsPageType
    dispatch: (action: ActionsType) => void
}

export const Dialogs: React.FC<PropsType> = ({dialogsPage, dispatch}) => {

    const dialog = dialogsPage.dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>
    })

    const message = dialogsPage.messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>
    })

    const sendMessageHandle = () => {
        dispatch(sendMessageAC())
    }
    const updateNewMessageTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewMessageAC(e.currentTarget.value))
    }

    return (
        <>
            <div className={styles.dialogs}>
                <div className={styles.dialogsItem}>
                    {dialog}
                </div>
                <div className={styles.messages}>
                    {message}
                    <input type="text" value={dialogsPage.newMessageText} onChange={updateNewMessageTextHandle}/>
                    <button onClick={sendMessageHandle}>add message</button>
                </div>
            </div>
        </>
    );
};

