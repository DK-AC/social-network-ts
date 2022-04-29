import React from 'react';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {FormikHelpers, FormikValues} from 'formik';

import {addPostAC} from '../../../redux/reducers/profileReducer';
import {useAppSelector} from '../../../redux/store';
import {ReusableFormik} from '../../../ReusableComponent/Formik/ReusableFormik';

import {Post} from './Post/Post';
import styles from './posts.module.css';

export const Posts: React.FC = () => {

    const dispatch = useDispatch();

    const posts = useAppSelector(state => state.profile.posts);

    const post = posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>;
    });
    const addPostMessage = (message: FormikValues, action: FormikHelpers<FormikValues>) => {
        dispatch(addPostAC(message.postMessage.toString()))
        action.resetForm({values: {postMessage: ''}})
    }
    const validationPostMessageField = {
        postMessage: Yup.string()
            .max(30, `Max length is ${30} symbols`),
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <ReusableFormik initialValues={{postMessage: ''}}
                                onSubmit={addPostMessage}
                                nameButton={'add post'}
                                name={'postMessage'}
                                type={'text'}
                                validationSchema={validationPostMessageField}
                />
            </div>
            {post}
        </div>
    );
};

