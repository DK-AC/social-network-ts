import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {Form, Formik, FormikHelpers, FormikValues} from 'formik';

import {sendMessageAC} from '../../redux/reducers/dialogsReducer';
import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';
import {FormikField} from '../../reusableComponent/FormikField';

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
    const addDialogMessage = (message: FormikValues, action: FormikHelpers<{ dialogMessage: string }>) => {
        dispatch(sendMessageAC(message.dialogMessage.toString()))
        action.resetForm({values: {dialogMessage: ''}})
    }
    const validationSchema = {
        dialogMessage: Yup.string()
            .max(30, `Max length is ${30} symbols`),
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
                    <Formik
                        initialValues={{dialogMessage: ''}}
                        validationSchema={Yup.object(validationSchema)}
                        onSubmit={addDialogMessage}
                    >
                        {formik => (
                            <Form>
                                <FormikField name={'dialogMessage'}
                                             type={'text'}
                                             isShowError={true}
                                             isShowLabel={false}
                                />
                                <button disabled={!!formik.errors.dialogMessage} type="submit">
                                    add message
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

