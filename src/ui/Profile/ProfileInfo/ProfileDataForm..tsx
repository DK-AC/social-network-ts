import React from 'react';
import * as Yup from 'yup';
import {Form, Formik} from 'formik';

import {ContactsUserType, ProfileUserType} from '../../../api/profileAPI';
import {FormikField} from '../../../reusableComponent/FormikField';
import {useAppSelector} from '../../../redux/store';

import styles from './profileInfo.module.css'

type PropsType = {
    profile: ProfileUserType
    goToSaveMode: () => void
    editMode: boolean
}

type Values = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsUserType
}

export const ProfileDataForm: React.FC<PropsType> = ({profile, goToSaveMode, editMode}) => {

    const error = useAppSelector(state => state.app.error)

    const {fullName, lookingForAJobDescription, lookingForAJob, contacts, aboutMe} = profile

    const initialValues = {
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts,

    }
    const validationSchema = {
        // fullName: Yup.string().email('Invalid email format').required('Required'),
        // password: Yup.string().required('Required'),
    }
    const onSubmitLoginUser = (values: Values) => {
        goToSaveMode()
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={onSubmitLoginUser}
            >
                {formik => (
                    <Form>
                        <button type="submit">Save</button>
                        <div>
                            <b>Full name: </b>
                            <FormikField name={'fullName'}
                                         error={error}
                                         placeholder={'Full name'}
                            />
                        </div>
                        <div>
                            <b>Looking for a job: </b>
                            <FormikField type={'checkbox'}
                                         name={'lookingForAJob'}
                                         error={error}
                            />
                        </div>
                        <div>
                            <b>My professional skills: </b>
                            <FormikField name={'lookingForAJobDescription'}
                                         error={error}
                                         placeholder={'My professional skills'}
                            />
                        </div>
                        <div>
                            <b>About me: </b>
                            <FormikField name={'aboutMe'}
                                         error={error}
                                         placeholder={'About me'}
                            />
                        </div>
                        <div>
                            <b>Contacts: </b>{
                            Object.keys(contacts).map(key => {
                                return (
                                    <div key={key} className={styles.contact}>
                                        <b>{key}:
                                            <FormikField name={`contacts + ${key}`}
                                                         error={error}
                                                         placeholder={key}
                                            />
                                        </b>
                                    </div>)
                            })}
                        </div>
                    </Form>
                )}
            </Formik>

        </>
    );
};

