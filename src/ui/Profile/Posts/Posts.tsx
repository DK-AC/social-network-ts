import React from 'react'
import * as Yup from 'yup'
import {Form, Formik, FormikHelpers, FormikValues} from 'formik'
import {useDispatch} from 'react-redux'

import {Button} from 'antd'

import {SendOutlined} from '@ant-design/icons'

import {addPost} from '../../../store/reducers/profileReducer'
import {useAppSelector} from '../../../store/store'
import {FormikField} from '../../../reusableComponent/FormikField'

import {getAppError} from '../../../store/selectors/appSelectors'

import {getProfilePosts} from '../../../store/selectors/profileSelectors'

import {Post} from './Post/Post'
import styles from './posts.module.css'

export const Posts: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const posts = useAppSelector(getProfilePosts)
    const error = useAppSelector(getAppError)

    const post = posts.map(p => {
        return <Post key={p.id} postId={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    const addPostHandle = (message: FormikValues, action: FormikHelpers<{ postMessage: string }>) => {
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
                        <Form>
                            <FormikField name={'postMessage'}
                                         type={'text'}
                                         isShowError={true}
                                         isShowLabel={false}
                                         error={error}
                            />
                            <Button disabled={!!formik.errors.postMessage}
                                    htmlType={'submit'}
                                    icon={<SendOutlined/>}
                                    size={'small'}>
                                Send post
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            {post}
        </div>
    )
})

