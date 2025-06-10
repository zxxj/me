import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('@/pages/login/index'));

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
]);
