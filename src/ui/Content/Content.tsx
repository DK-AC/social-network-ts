import React from 'react';
import styles from './content.module.css'


export const Content = () => {
    return (
        <div className={styles.content}>
            <div>
                <img src="https://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg"
                     alt="img"/>
            </div>
            <div>
                ava + description
            </div>
            <div>
                My posts
                <div>New post</div>
                <div>Post 1</div>
                <div>Post 2</div>
                <div>Post 3</div>
            </div>

        </div>
    );
};