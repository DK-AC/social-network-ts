import React from 'react'
import {useDispatch} from 'react-redux'

import {changeCurrentPage, changePortionNumber} from '../../redux/reducers/usersReducer'
import {useAppSelector} from '../../redux/store'

import styles from './paginator.module.css'

type PropsType = { portionSize?: number }

export const Paginator: React.FC<PropsType> = ({portionSize = 10}) => {

    const dispatch = useDispatch()

    const {pageSize, currentPage, totalCount, portionNumber} = useAppSelector(state => state.users)

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
                              onClick={() => dispatch(changeCurrentPage({currentPage: p}))}
                        >
                        {p}
                    </span>)
                })}

            {portionCount > portionNumber && <button onClick={setPortionPlusNumberHandle}>NEXT</button>}

        </div>

    )
}



