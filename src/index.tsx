import './index.css'
import {createRoot} from 'react-dom/client'
import React from 'react'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {App} from './components'
import reportWebVitals from './reportWebVitals'
import {store} from './store/store'

const container = document.getElementById('root')
export const root = createRoot(container as Element)

root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
