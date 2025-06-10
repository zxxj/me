import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('@/pages/login/index'));
const Layout = lazy(() => import('@/layout/index'));

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
  },
]);
