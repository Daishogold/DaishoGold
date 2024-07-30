import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="942500907644-lf54uvftuh9g7br84g255h2aun5icp75.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
