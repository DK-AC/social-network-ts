import React from 'react'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import {URLSearchParamsInit} from 'react-router-dom'

import {FormikField} from '../../reusableComponent/FormikField'
import {useAppSelector} from '../../redux/store'
import {setUsers} from '../../redux/reducers/usersReducer'
import {ParamsUserPageType} from '../../api/userAPI'

type PropsType = {
    setSearchParams: (nextInit: URLSearchParamsInit) => void
}

export const UsersSearchForm: React.FC<PropsType> = ({setSearchParams}) => {

    const dispatch = useDispatch()

    const {currentPage, pageSize} = useAppSelector(state => state.users)
    const {term, friend} = useAppSelector(state => state.users.filter)
    const {error} = useAppSelector(state => state.app)


    const initialValues = {term, currentPage, pageSize, friend}
    const validationSchema = {}
    const onSubmitLoginUser = (values: ParamsUserPageType) => {
        dispatch(setUsers({pageSize, currentPage, term: values.term, friend: values.friend}))
        setSearchParams({page: '1', term: values.term, friend: values.friend as string})
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={onSubmitLoginUser}
        >
            {formik => (
                <Form>
                    <FormikField type={'text'}
                                 name={'term'}
                                 isShowError={false}
                                 isShowLabel={false}
                                 error={error}
                                 placeholder={'find users'}
                    />
                    <Field name="friend" as="select">
                        <option value={'null'}>All</option>
                        <option value={'true'}>Only followed</option>
                        <option value={'false'}>Only unfollowed</option>
                    </Field>
                    <button disabled={!formik.isValid} type={'submit'}>Search</button>
                    <div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

