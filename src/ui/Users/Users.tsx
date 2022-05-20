import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {Form, Formik} from 'formik'

import {useAppSelector} from '../../redux/store'
import {setUsers} from '../../redux/reducers/usersReducer'
import {Preloader} from '../Preloader/Preloader'
import {PATH} from '../Routing/Routing'
import {Paginator} from '../common/Paginator'
import {ParamsUserPageType} from '../../api/userAPI'
import {FormikField} from '../../reusableComponent/FormikField'

import {User} from './User/User'
import styles from './users.module.css'


export const Users: React.FC = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {users, currentPage, pageSize} = useAppSelector(state => state.users)
    const {error, status} = useAppSelector(state => state.app)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const params: ParamsUserPageType = {
        pageSize,
        currentPage,
    }

    const initialValues = {term: ''}
    const validationSchema = {}
    const onSubmitLoginUser = () => {
        // dispatch(login(values))
    }

    const user = users.map(u => {
        return <User key={u.id} user={u}/>
    })


    useEffect(() => {

        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
        dispatch(setUsers(params))
    }, [isAuth, navigate, currentPage])

    return (
        <div className={styles.userItems}>
            {status === 'loading' ? <Preloader/>
                : <div>
                    <Paginator/>
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
                                <button disabled={!formik.isValid} type="submit">Sign Up</button>
                                <div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {user}
                </div>}
        </div>
    )
}



