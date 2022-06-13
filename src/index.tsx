import {createRoot} from 'react-dom/client'
import React from 'react'
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {App} from './components'
import reportWebVitals from './reportWebVitals'
import {store} from './store'

const container = document.getElementById('root')
export const root = createRoot(container as Element)

root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>,
)

reportWebVitals()
