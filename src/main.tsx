import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import RecipePage from './pages/RecipePage.tsx';
import ValidateToken from './components/ValidateToken.tsx';

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
        element: <ValidateToken route='/'/>,
        children: [
          {
            path: '/dashboard',
            element: < Dashboard />
          },
          {
            path: '/dashboard/receita',
            element: <RecipePage />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
