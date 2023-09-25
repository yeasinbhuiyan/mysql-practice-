import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from './Layout.jsx';
import PrivateRoter from './router/PrivateRoter.jsx';
import Home from './Home/Home.jsx';
import Blog from './page/Blog/Blog.jsx';
import About from './page/About/About.jsx';
import Login from './Component/Login/Login.jsx';
import Register from './Component/Register/Register.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/employ-details',
        element: <PrivateRoter><App /></PrivateRoter>,
      },
      {
        path: '/blog',
        element: <PrivateRoter><Blog /></PrivateRoter>,
      },
      {
        path: '/about',
        element: <PrivateRoter><About /></PrivateRoter>,
      },

      {
        path: '/login',
        element: <Login />
      }, {
        path: '/register',
        element: <Register />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <AuthProvider>

      <RouterProvider router={router} />

    </AuthProvider>

  </React.StrictMode>,
)
