import React from 'react';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';

import {addPostAC} from '../../../redux/reducers/profileReducer';
import {useAppSelector} from '../../../redux/store';

import {Post} from './Post/Post';
import styles from './posts.module.css';

export const Posts: React.FC = () => {

    const dispatch = useDispatch();

    const posts = useAppSelector(state => state.profile.posts);

    const post = posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>;
    });

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <Formik
                    initialValues={{postMessage: ''}}
                    validationSchema={Yup.object({
                        postMessage: Yup.string()
                            .min(1, 'message should not empty')
                            .required('Required'),
                    })}
                    onSubmit={(message) => {
                        dispatch(addPostAC(JSON.stringify(message.postMessage).slice(1, -1)))
                    }}
                >
                    <Form>
                        <Field name="postMessage" type="text"/>
                        <button type="submit">add post</button>
                    </Form>
                </Formik>
            </div>
            {post}
        </div>
    );
};

