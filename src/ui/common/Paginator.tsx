import React from 'react'
import {useDispatch} from 'react-redux'

import {Pagination, PaginationProps} from 'antd'

import {changeCurrentPage, changePageSize} from '../../redux/reducers/usersReducer'
import {useAppSelector} from '../../redux/store'
import {UriParamsType} from '../../api/userAPI'

type PropsType = {
    setSearchParams: (nextInit: UriParamsType) => void
    uriParams: UriParamsType
}

export const Paginator: React.FC<PropsType> = ({setSearchParams, uriParams}) => {

    const dispatch = useDispatch()

    const {currentPage, totalCount, pageSize} = useAppSelector(state => state.users)
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


    return (

        <Pagination total={totalCount}
                    itemRender={itemRender}
                    onChange={(page, pageSize) => {
                        dispatch(changeCurrentPage({currentPage: page}))
                        dispatch(changePageSize({pageSize}))
                        setSearchParams({page: String(page), term, friend, count: String(pageSize)})
                    }}
                    current={currentPage}
                    showQuickJumper
                    pageSize={pageSize}
        />
    )
}