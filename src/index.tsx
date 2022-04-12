import './index.css';
import reportWebVitals from './reportWebVitals';
import {addPost, state, StateType, subscribe, updatePostText} from './redux/state';
import {createRoot} from "react-dom/client";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";

const container = document.getElementById('root')
export const root = createRoot(container as Element)

let rerenderEntireTree = () => {
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

rerenderEntireTree()

subscribe(rerenderEntireTree)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
