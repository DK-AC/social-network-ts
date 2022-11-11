import {FC} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import {Form, Formik, FormikHelpers, FormikValues} from 'formik'
import {SendOutlined} from '@ant-design/icons'
import {Button} from 'antd'

import {getDialogs, getMessages, sendMessage, useAppSelector} from 'store'

import {FormikField} from 'reusableComponent/FormikField'


import {DialogItem} from './DialogItem'
import {MessageItem} from './MessageItem'
import styles from './dialogs.module.css'

export const Dialogs: FC = () => {

    const dispatch = useDispatch()

    const dialogs = useAppSelector(getDialogs)
    const messages = useAppSelector(getMessages)

    const dialog = dialogs.map(d => {
        return <DialogItem key={d.id} id={d.id} name={d.name} />
    })
    const message = messages.map(m => {
        return <MessageItem key={m.id} id={m.id} message={m.message} />
    })
    const addDialogMessage = (message: FormikValues, action: FormikHelpers<{dialogMessage: string}>) => {
        dispatch(sendMessage({messageText: String(message.dialogMessage)}))
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
                            <Form className={styles.form}>
                                <FormikField name={'dialogMessage'}
                                             type={'text'}
                                             isShowError={true}
                                             isShowLabel={false}
                                             error={formik.errors.dialogMessage}
                                />
                                <Button disabled={!formik.isValid}
                                        htmlType={'submit'}
                                        icon={<SendOutlined />}
                                        className={styles.btn}
                                >
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

