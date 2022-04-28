import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {FormikValues} from 'formik';

import {sendMessageAC} from '../../redux/reducers/dialogsReducer';
import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';
import {ReusableFormik} from '../../ReusableComponent/ReusableFormik';

import styles from './dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {MessageItem} from './MessageItem/MessageItem';

export const Dialogs: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {dialogs, messages} = useAppSelector(state => state.dialogs);
    const isInitialized = useAppSelector(state => state.auth.isInitialized);

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>;
    });

    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>;
    });
    const addDialogMessage = (message: FormikValues) => {
        dispatch(sendMessageAC(message.dialogMessage.toString()))
    }
    const validationDialogMessageField = {
        dialogMessage: Yup.string()
            .min(1, 'message should not be empty')
            .required('Required'),
    }

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
                    <ReusableFormik initialValues={{dialogMessage: ''}}
                                    onSubmit={addDialogMessage}
                                    nameButton={'add message'}
                                    nameField={'dialogMessage'}
                                    typeField={'text'}
                                    validationSchema={validationDialogMessageField}
                    />
                </div>
            </div>
        </>
    );
};

