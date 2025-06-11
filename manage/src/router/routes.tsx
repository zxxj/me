import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('@/pages/login/index'));
const Layout = lazy(() => import('@/layout/index'));

const Dashboard = lazy(() => import('@/pages/dashboard/index'));
const Publish = lazy(() => import('@/pages/post/publish/index'));
const Action = lazy(() => import('@/pages/post/action/index'));

export const routes: RouteObject[] = [
  {
    path: '/login',

    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'post',
        children: [
          {
            path: 'publish',
            element: <Publish />,
          },
          {
            path: 'action',
            element: <Action />,
          },
        ],
      },
    ],
  },
];
