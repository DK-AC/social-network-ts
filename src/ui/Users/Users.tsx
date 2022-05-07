import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../../redux/store';
import {setUsersTC} from '../../redux/reducers/usersReducer';
import {ParamsUserPageType} from '../../api/userAPI';
import {Preloader} from '../Preloader/Preloader';
import {PATH} from '../Routing/Routing';
import {Paginator} from '../common/Paginator';

import styles from './users.module.css';
import {User} from './User/User';

export const Users: React.FC = () => {

    console.log('redux toolkit')

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const {users, pageSize, currentPage} = useAppSelector(state => state.users);
    const isLoading = useAppSelector(state => state.app.isLoading);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const params: ParamsUserPageType = {
        pageSize,
        currentPage,
    };

    const user = users.map(u => {
        return <User key={u.id} user={u}/>;
    });

    useEffect(() => {
        if (!isAuth) {
            navigate(PATH.LOGIN_PAGE)
        }
        dispatch(setUsersTC(params));
    }, [currentPage, dispatch, isAuth, navigate]);

    return (
        <div className={styles.userItems}>
            {isLoading === 'loading' ? <Preloader/>
                : <div>
                    <Paginator/>
                    {user}
                </div>}
        </div>
    );
};



