import React from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import {Form, Formik, FormikHelpers, FormikValues} from 'formik'

import {sendMessage} from '../../redux/reducers/dialogsReducer'
import {useAppSelector} from '../../redux/store'
import {FormikField} from '../../reusableComponent/FormikField'

import styles from './dialogs.module.css'
import {DialogItem} from './DialogItem/DialogItem'
import {MessageItem} from './MessageItem/MessageItem'

export const Dialogs: React.FC = () => {

    const dispatch = useDispatch()

    const {dialogs, messages} = useAppSelector(state => state.dialogs)
    const error = useAppSelector(state => state.app.error)

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name}/>
    })
    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message}/>
    })
    const addDialogMessage = (message: FormikValues, action: FormikHelpers<{ dialogMessage: string }>) => {
        dispatch(sendMessage({messageText: message.dialogMessage.toString()}))
        action.resetForm({values: {dialogMessage: ''}})
    }
    const validationSchema = {
        dialogMessage: Yup.string()
            .max(30, `Max length is ${30} symbols`),
    }

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
                                             error={error}
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
    )
}

