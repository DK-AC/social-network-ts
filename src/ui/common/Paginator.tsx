import React from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../redux/store';
import {changeCurrentPageAC} from '../../redux/reducers/usersReducer';

import styles from './paginator.module.css';

export const Paginator: React.FC = () => {

    const dispatch = useDispatch();

    const {pageSize, currentPage, totalCount} = useAppSelector(state => state.users);

    const pagesCount = Math.ceil(totalCount / pageSize);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        if (i === 50) break;
        pages.push(i);
    }

    const changeCurrentPageHandle = (page: number) => dispatch(changeCurrentPageAC(page));

    return (
        <div>
            {pages.map((p, index) => {
                return (
                    <span key={index}
                          className={currentPage === p ? styles.currentPage : '' + styles.pageItems}
                          onClick={() => changeCurrentPageHandle(p)}
                    >
                        {p}
                    </span>);
            })}
        </div>

    )
};



