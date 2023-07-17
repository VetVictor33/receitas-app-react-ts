import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import UserFavoriteRecipes from './pages/UserFavoriteRecipes.tsx';
import ValidateToken from './components/ValidateToken.tsx';
import UserProvider from './context/UserContext.tsx';
import UserRecipes from './pages/UserRecipes.tsx';
import PageNotFound from './pages/PageNotFound.tsx';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <Signup />
      },
      {
        element: <ValidateToken route='/' />,
        children: [
          {
            path: '/dashboard/home',
            element: < Dashboard />
          },
          {
            path: '/dashboard/minhas-receitas',
            element: <UserRecipes />
          },
          {
            path: '/dashboard/receitas-favoritas',
            element: <UserFavoriteRecipes />
          }
        ]
      },
      {
        path: '*',
        element: <PageNotFound />,
      }

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
)
