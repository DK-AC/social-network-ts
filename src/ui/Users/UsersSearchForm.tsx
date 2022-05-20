import React from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'

import {FormikField} from '../../reusableComponent/FormikField'
import {useAppSelector} from '../../redux/store'
import {changeCurrentPage, setUsers} from '../../redux/reducers/usersReducer'
import {ParamsUserPageType} from '../../api/userAPI'

export const UsersSearchForm = () => {

    const dispatch = useDispatch()

    const {currentPage, pageSize} = useAppSelector(state => state.users)
    const {term} = useAppSelector(state => state.users.filter)
    const {error} = useAppSelector(state => state.app)

    const initialValues = {term, currentPage, pageSize}
    const validationSchema = {}
    const onSubmitLoginUser = (values: ParamsUserPageType) => {
        dispatch(setUsers({pageSize, currentPage, term: values.term}))
        //todo fix to change curr page if term is changed
        dispatch(changeCurrentPage({currentPage: 1}))
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
                    <button disabled={!formik.isValid} type="submit">Search</button>
                    <div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

