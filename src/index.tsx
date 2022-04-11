import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";

const postsData: PostDataType[] = [
    {id: 1, message: '1 post', likesCount: 20},
    {id: 2, message: '2 post', likesCount: 1},
    {id: 3, message: '3 post', likesCount: 55},
]

export type PostDataType = { id: number, message: string, likesCount: number }

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App posts={postsData}/>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
