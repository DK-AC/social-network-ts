import * as Yup from 'yup'
import {Form, Formik, FormikHelpers, FormikValues} from 'formik'
import {useDispatch} from 'react-redux'
import {Button} from 'antd'
import {SendOutlined} from '@ant-design/icons'
import {FC, memo} from 'react'

import {FormikField} from '../../../reusableComponent/FormikField'
import {addPost, getAppError, getProfilePosts, useAppSelector} from '../../../store'
import {ErrorMessage} from '../../common'

import {Post} from './Post'
import styles from './posts.module.css'

export const Posts: FC = memo(() => {

    const dispatch = useDispatch()

    const posts = useAppSelector(getProfilePosts)
    const error = useAppSelector(getAppError)

    const post = posts.map(p => {
        return <Post key={p.id} postId={p.id} message={p.message} likesCount={p.likesCount} />
    })
    const addPostHandle = (message: FormikValues, action: FormikHelpers<{postMessage: string}>) => {
        dispatch(addPost({postText: String(message.postMessage)}))
        action.resetForm({values: {postMessage: ''}})
    }
    const validationSchema = {
        postMessage: Yup.string()
            .max(30, `Max length is ${30} symbols`),
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <Formik
                    initialValues={{postMessage: ''}}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={addPostHandle}
                >
                    {formik => (
                        <Form className={styles.form}>
                            <FormikField name={'postMessage'}
                                         type={'text'}
                                         isShowError={true}
                                         isShowLabel={false}
                                         error={formik.errors.postMessage}
                            />
                            <Button htmlType={'submit'}
                                    icon={<SendOutlined />}
                                    disabled={!formik.isValid}
                                    className={styles.btn}
                            >
                            </Button>
                            {error && <ErrorMessage />}
                        </Form>
                    )}
                </Formik>
            </div>
            {post}
        </div>
    )
})

