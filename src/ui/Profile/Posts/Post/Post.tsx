import React from "react";
import styles from './post.module.css'

export const Post = () => {
    return (
        <div>
            <div>New post</div>
            <div className={`${styles.item}`}>Post 1</div>
            <div className={`${styles.item}`}>Post 2</div>
            <div className={`${styles.item}`}>Post 3</div>
        </div>
    )
}