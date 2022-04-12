import {addPost, StateType, updatePostText} from "./redux/state";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import React from "react";
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root')
export const root = createRoot(container as Element)

export const rerenderEntireTree = (state: StateType) => {
    return (
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App state={state} addPost={addPost} updatePostText={updatePostText}/>
                </BrowserRouter>
            </React.StrictMode>,
        )
    )

}