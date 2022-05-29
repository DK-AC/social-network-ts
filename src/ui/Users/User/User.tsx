import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {Button} from 'antd'
import {UserAddOutlined, UserDeleteOutlined} from '@ant-design/icons'

import {followUnfollow} from '../../../store/reducers/usersReducer'
import {useAppSelector} from '../../../store/store'
import {UserType} from '../../../api'
import {getFollowingInProgress} from '../../../store/selectors/usersSelectors'
import {FOLLOW, UNFOLLOW} from '../../../constans/base'

import styles from './user.module.css'
import avaImg from './../../../assets/img/client-2-512.webp'


type PropsType = { user: UserType }

export const User: FC<PropsType> = ({user}) => {

    const dispatch = useDispatch()

    const followingInProgress = useAppSelector(getFollowingInProgress)

    const {id, name, photos, followed, status} = user

    const followUserHandle = () => dispatch(followUnfollow({userId: id, isFollow: FOLLOW}))
    const unFollowUserHandle = () => dispatch(followUnfollow({userId: id, isFollow: UNFOLLOW}))


    return (
        <div className={styles.item}>
            <div>
                <div>{name}</div>
            </div>
            <div>
                <div>
                    <NavLink to={'/profile/' + id}>
                        <img
                            src={photos.small ? photos.small : avaImg}
                            alt="ava"
                            className={styles.ava}
                        />
                    </NavLink>

                </div>
                <div>{status}</div>

                <div>
                    {followed
                        ? <Button disabled={followingInProgress.some(userId => userId === id)}
                                  htmlType={'submit'}
                                  icon={<UserDeleteOutlined/>}
                                  onClick={unFollowUserHandle}
                                  size={'small'}>
                            Unfollow
                        </Button>
                        : <Button disabled={followingInProgress.some(userId => userId === id)}
                                  htmlType={'submit'}
                                  icon={<UserAddOutlined/>}
                                  onClick={followUserHandle}
                                  size={'small'}>
                            Follow
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}