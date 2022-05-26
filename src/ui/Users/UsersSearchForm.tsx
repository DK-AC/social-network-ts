import React, {FC} from 'react'
import {Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import {URLSearchParamsInit} from 'react-router-dom'
import {SearchOutlined} from '@ant-design/icons'
import {Button} from 'antd'

import {FormikField} from '../../reusableComponent/FormikField'
import {useAppSelector} from '../../redux/store'
import {setUsers} from '../../redux/reducers/usersReducer'
import {ParamsUserPageType} from '../../api/userAPI'
import {getAppError} from '../../selectors/appSelectors'
import {getCurrentPage, getFilterFriend, getFilterTerm, getPageSize} from '../../selectors/usersSelectors'

type PropsType = {
    setSearchParams: (nextInit: URLSearchParamsInit) => void
}

export const UsersSearchForm: FC<PropsType> = ({setSearchParams}) => {

    const dispatch = useDispatch()

    const currentPage = useAppSelector(getCurrentPage)
    const pageSize = useAppSelector(getPageSize)
    const term = useAppSelector(getFilterTerm)
    const friend = useAppSelector(getFilterFriend)
    const error = useAppSelector(getAppError)

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
                    <Button htmlType={'submit'} size={'small'} icon={<SearchOutlined/>}>Search</Button>
                    <div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

