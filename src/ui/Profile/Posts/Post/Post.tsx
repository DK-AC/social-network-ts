import React from "react";
import styles from './post.module.css'

export const Post = () => {
    return (
        <div>
            <div className={`${styles.item}`}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyQ3Ez7fGNDmuULcJxaGc3CxZ5ohwAoFeGQ&usqp=CAU"
                    alt="avatar"/>
                Post 1
            </div>
            <span>like</span>
        </div>
    )
}