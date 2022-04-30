import React from 'react';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Form, Formik, FormikHelpers, FormikValues} from 'formik';

import {addPostAC} from '../../../redux/reducers/profileReducer';
import {useAppSelector} from '../../../redux/store';
import {FormikField} from '../../../reusableComponent/FormikField';

import {Post} from './Post/Post';
import styles from './posts.module.css';

export const Posts: React.FC = React.memo(() => {

    const dispatch = useDispatch();

    const posts = useAppSelector(state => state.profile.posts);
    const error = useAppSelector(state => state.app.error)

    const post = posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>;
    });
    const addPostMessage = (message: FormikValues, action: FormikHelpers<{ postMessage: string }>) => {
        dispatch(addPostAC(message.postMessage.toString()))
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
                    onSubmit={addPostMessage}
                >
                    {formik => (
                        <Form>
                            <FormikField name={'postMessage'}
                                         type={'text'}
                                         isShowError={true}
                                         isShowLabel={false}
                                         error={error}
                            />
                            <button disabled={!!formik.errors.postMessage} type="submit">add post</button>
                        </Form>
                    )}
                </Formik>
            </div>
            {post}
        </div>
    );
})

