import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {useAppSelector} from '../../redux/store';
import {setUsersTC} from '../../redux/reducers/usersReducer';
import {Preloader} from '../Preloader/Preloader';
import {PATH} from '../Routing/Routing';
import {Paginator} from '../common/Paginator';

import styles from './users.module.css';
import {User} from './User/User';
import {ParamsUserPageType} from "../../api/typesAPI";


export const Users: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const pageSize = useAppSelector(state => state.users.pageSize);
    const users = useAppSelector(state => state.users.users);
    const currentPage = useAppSelector(state => state.users.currentPage);
    const isLoading = useAppSelector(state => state.app.status);
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
    }, [isAuth, navigate, currentPage]);

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



