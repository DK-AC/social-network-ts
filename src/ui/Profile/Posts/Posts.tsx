import React, {ChangeEvent, useState} from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";
import {ActionsType, addPostAC, ProfilePageType, updateNewPostTextAC} from "../../../redux/state";

type PropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const Posts: React.FC<PropsType> = ({profilePage, dispatch}) => {

    const [postText, setPostText] = useState(profilePage.newPostText)

    const post = profilePage.posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    const addPostHandle = () => {
        setPostText(postText)
        dispatch(addPostAC(postText))
    }
    const updatePostTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewPostTextAC(e.currentTarget.value))
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input value={postText}
                           onChange={updatePostTextHandle}
                           placeholder={'post'}
                    />
                    <button onClick={addPostHandle}>Add post</button>
                </div>
            </div>
            {post}
        </div>
    );
};

