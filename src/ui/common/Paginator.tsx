import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Pagination, PaginationProps} from 'antd'

import {changeCurrentPage, changePageSize} from '../../store/reducers/usersReducer'
import {useAppSelector} from '../../store/store'
import {UriParamsType} from '../../api'
import {getCurrentPage, getPageSize, getTotalCount} from '../../store'

type PropsType = {
    setSearchParams: (nextInit: UriParamsType) => void
    uriParams: UriParamsType
}

export const Paginator: FC<PropsType> = ({setSearchParams, uriParams}) => {

    const dispatch = useDispatch()

    const currentPage = useAppSelector(getCurrentPage)
    const totalCount = useAppSelector(getTotalCount)
    const pageSize = useAppSelector(getPageSize)

    const {term, friend} = uriParams

    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>
        }
        if (type === 'next') {
            return <a>Next</a>
        }
        return originalElement
    }

    const changePageAndPageSizeHandle = (page: number, pageSize: number) => {
        dispatch(changeCurrentPage({currentPage: page}))
        dispatch(changePageSize({pageSize}))
        setSearchParams({page: String(page), term, friend, count: String(pageSize)})

    }


    return (

        <Pagination total={totalCount}
                    itemRender={itemRender}
                    onChange={changePageAndPageSizeHandle}
                    current={currentPage}
                    showQuickJumper
                    pageSize={pageSize}
        />
    )
}