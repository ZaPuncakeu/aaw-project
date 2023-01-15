import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

// Utilisation de Redux pour un state management
import store from './store'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
