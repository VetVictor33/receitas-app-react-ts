import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './Root.tsx';
import ValidateToken from './components/ValidateToken.tsx';
import UserProvider from './context/UserContext.tsx';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginSignUpPage from './pages/LoginSignUpPage.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import { favoritesDashboardPath, generalDashboardPath, logInPath, notLoggedDashboardPath, signUpPath, usersDashboardPath } from './utils/pathnameUtils.ts';

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: notLoggedDashboardPath,
        element: <Dashboard method='notLogged' />
      },
      {
        path: logInPath,
        element: <LoginSignUpPage form='login' />
      },
      {
        path: signUpPath,
        element: <LoginSignUpPage form='signUp' />
      },
      {
        element: <ValidateToken route={notLoggedDashboardPath} />,
        children: [
          {
            path: generalDashboardPath,
            element: <Dashboard method='dashboard' />
          },
          {
            path: usersDashboardPath,
            element: <Dashboard method='users' />
          },
          {
            path: favoritesDashboardPath,
            element: <Dashboard method='favorites' />
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
