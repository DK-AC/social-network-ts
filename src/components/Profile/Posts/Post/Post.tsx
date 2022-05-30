import React from 'react'
import {useDispatch} from 'react-redux'

import {DeleteOutlined} from '@ant-design/icons'

import {Button} from 'antd'

import {deletePost} from '../../../../store/reducers/profileReducer'

import styles from './post.module.css'
import postPhoto from './../../../../assets/img/postPhoto.jpg'

type PropsType = {
    postId: number
    message: string
    likesCount: number
}

export const Post: React.FC<PropsType> = React.memo(({postId, message, likesCount}) => {

    const dispatch = useDispatch()

    const deletePostHandle = () => {
        dispatch(deletePost({postId}))
    }

    return (
        <div className={styles.post}>
            <div className={`${styles.item}`}>
                <img
                    src={postPhoto}
                    alt="postPhoto"/>
                {message}
                <Button danger icon={<DeleteOutlined/>} size={'small'} onClick={deletePostHandle}/>
            </div>
            <span> like {likesCount}</span>
        </div>
    )
})