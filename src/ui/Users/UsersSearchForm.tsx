import React from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'

import {FormikField} from '../../reusableComponent/FormikField'
import {useAppSelector} from '../../redux/store'

export const UsersSearchForm = () => {

    const dispatch = useDispatch()

    const {error} = useAppSelector(state => state.app)

    const initialValues = {term: ''}
    const validationSchema = {}
    const onSubmitLoginUser = () => {
        // dispatch(login(values))
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

