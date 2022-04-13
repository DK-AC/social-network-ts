import React, {ChangeEvent} from 'react';
import {Post} from "./Post/Post";
import styles from "./posts.module.css";
import {ActionsType, addPostAC, ProfilePageType, updateNewPostTextAC} from "../../../redux/state";

type PropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const Posts: React.FC<PropsType> = ({profilePage, dispatch}) => {

    // const [state, dispatchRed] = useReducer(profileReducer, profilePage)

    const post = profilePage.posts.map(p => {
        return <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>
    })
    const addPostHandle = () => {
        dispatch(addPostAC(profilePage.newPostText))
    }
    const updatePostTextHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateNewPostTextAC(e.currentTarget.value))
    }

    return (
        <div className={styles.posts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <input value={profilePage.newPostText}
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

