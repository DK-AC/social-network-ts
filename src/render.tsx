import {addPost, StateType, updatePostText} from "./redux/state";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import React from "react";
import ReactDOM from "react-dom";

export const rerenderEntireTree = (state: StateType) => {
    return (
        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App state={state} addPost={addPost} updatePostText={updatePostText}/>
                </BrowserRouter>
            </React.StrictMode>,
            document.getElementById('root')
        )
    )

}