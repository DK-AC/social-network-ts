import React from "react";
import styles from './post.module.css'

type PropsType = {
    message: string
    likesCount: number
}

export const Post = ({message, likesCount}: PropsType) => {
    return (
        <div>
            <div className={`${styles.item}`}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyQ3Ez7fGNDmuULcJxaGc3CxZ5ohwAoFeGQ&usqp=CAU"
                    alt="avatar"/>
                {message}
            </div>
            <span> like {likesCount}</span>
        </div>
    )
}