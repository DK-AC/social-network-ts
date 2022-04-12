import React from 'react';
import './App.css';
import {Header} from "./ui/Header/Header";
import {Navbar} from "./ui/Navbar/Navbar";
import {StateType} from "./redux/state";
import {Routing} from "./ui/Routing/Routing";

type PropsType = {
    state: StateType
    addPost: () => void
    updatePostText: (postText: string) => void
}

export const App: React.FC<PropsType> = ({state, addPost, updatePostText}) => {
    return (
        <div className={'app-wrapper'}>
            <Header/>
            <Navbar friends={state.sideBarPage.friends}/>
            <div className={'app-wrapper-content'}>
                <Routing state={state} addPost={addPost} updatePostText={updatePostText}/>
            </div>
        </div>
    );
}

