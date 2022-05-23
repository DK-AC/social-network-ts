import React from 'react'
import {useDispatch} from 'react-redux'
import {URLSearchParamsInit} from 'react-router-dom'

import {changeCurrentPage, changePortionNumber} from '../../redux/reducers/usersReducer'
import {useAppSelector} from '../../redux/store'
import {UriParamsType} from '../../api/userAPI'

import styles from './paginator.module.css'

type PropsType = {
    portionSize?: number
    setSearchParams: (nextInit: URLSearchParamsInit) => void
    uriParams: UriParamsType
}

export const Paginator: React.FC<PropsType> = ({portionSize = 10, setSearchParams, uriParams}) => {

    const dispatch = useDispatch()

    const {pageSize, currentPage, totalCount, portionNumber} = useAppSelector(state => state.users)
    const {term, friend} = uriParams

    const pagesCount = Math.ceil(totalCount / pageSize)
    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        if (i === totalCount) break
        pages.push(i)
    }

    const setPortionMinusNumberHandle = () => {
        dispatch(changePortionNumber({portionNumber: portionNumber - 1}))
    }
    const setPortionPlusNumberHandle = () => {
        dispatch(changePortionNumber({portionNumber: portionNumber + 1}))
    }

    return (
        <div className={styles.paginator}>

            {portionNumber > 1 && <button onClick={setPortionMinusNumberHandle}>PREV</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) => {
                    return (
                        <span key={index}
                              className={currentPage === p ? styles.selectedPage : '' + styles.pageNumber}
                              onClick={() => {
                                  dispatch(changeCurrentPage({currentPage: p}))
                                  setSearchParams({page: p.toString(), term, friend})
                              }}
                        >
                        {p}
                    </span>)
                })}

            {portionCount > portionNumber && <button onClick={setPortionPlusNumberHandle}>NEXT</button>}

        </div>

    )
}