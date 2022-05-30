import React, {FC} from 'react'
import {Form, Formik} from 'formik'
import {useDispatch} from 'react-redux'
import {CheckOutlined} from '@ant-design/icons'
import {Button} from 'antd'

import {ContactsKeysType, FormikField} from '../../../reusableComponent/FormikField'
import {useAppSelector} from '../../../store/store'
import {saveProfile} from '../../../store'
import {getAppError} from '../../../store'
import {ProfileUserType} from '../../../types'

import styles from './profileInfo.module.css'

type PropsType = {
    profile: ProfileUserType
    goToSaveMode: () => void
}

export const ProfileDataForm: FC<PropsType> = ({profile, goToSaveMode}) => {

    const dispatch = useDispatch()

    const error = useAppSelector(getAppError)

    const {fullName, lookingForAJobDescription, lookingForAJob, contacts, aboutMe} = profile

    const initialValues = {
        fullName,
        lookingForAJob,
        lookingForAJobDescription,
        aboutMe,
        contacts,
        userId: profile.userId,
        photos: profile.photos,
    }

    const onSubmitLoginUser = (values: ProfileUserType) => {
        dispatch(saveProfile(values))
        goToSaveMode()
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmitLoginUser}
            >
                {formik => (
                    <Form>
                        <Button htmlType={'submit'} icon={<CheckOutlined/>} size={'small'}> Save</Button>
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
                            Object
                                .keys(contacts)
                                .map(key => {
                                    return (
                                        <div key={key} className={styles.contact}>
                                            <b>{key}:
                                                <FormikField name={`contacts.${key as ContactsKeysType}`}
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
    )
}

