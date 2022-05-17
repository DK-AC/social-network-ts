import 'react-app-polyfill/ie11';
import * as React from 'react';
import {useEffect} from 'react';
import {Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';

import {getCaptchaURLTC, loginTC} from '../../redux/reducers/authReducer';
import {useAppSelector} from '../../redux/store';
import {PATH} from '../Routing/Routing';
import {FormikField} from '../../reusableComponent/FormikField';
import {LoginUserType} from '../../api/typesAPI';


export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isAuth, captchaURL} = useAppSelector(state => state.auth)
    const error = useAppSelector(state => state.app.error)


    const initialValues: LoginUserType = {email: '', password: '', rememberMe: false, captcha: ''}
    const validationSchema = {
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    }
    const onSubmitLoginUser = (values: LoginUserType) => {
        dispatch(loginTC(values))
        dispatch(getCaptchaURLTC())
    }

    useEffect(() => {
        if (isAuth) {
            navigate(PATH.PROFILE_PAGE)
        }
        return
    }, [dispatch, isAuth, navigate])

    return (
        <div style={{width: '200px', margin: '0 auto'}}>
            <h1>Sign up</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={onSubmitLoginUser}
            >
                {formik => (
                    <Form>
                        <FormikField type={'email'}
                                     name={'email'}
                                     isShowError={false}
                                     isShowLabel={true}
                                     error={error}
                        />
                        <FormikField type={'password'}
                                     name={'password'}
                                     isShowError={true}
                                     isShowLabel={true}
                                     error={error}
                        />
                        <FormikField type={'checkbox'}
                                     name={'rememberMe'}
                                     isShowError={false}
                                     isShowLabel={true}
                                     error={error}
                        />
                        {captchaURL
                            ? <>
                                <img src={captchaURL} alt="captchaURL"/>
                                <FormikField type={'text'}
                                             name={'captcha'}
                                             isShowError={false}
                                             isShowLabel={false}
                                             error={error}
                                             placeholder={'Symbols from image'}
                                />
                            </>
                            : null
                        }
                        <div>
                            <button disabled={!formik.isValid} type="submit">Sign Up</button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
};

