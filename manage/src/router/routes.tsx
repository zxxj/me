import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { withRoute } from './authRoute';

const Login = lazy(() => import('@/pages/login/index'));
const Layout = lazy(() => import('@/layout/index'));

const Dashboard = lazy(() => import('@/pages/dashboard/index'));
const PostList = lazy(() => import('@/pages/post/list/index'));
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
        path: '',
        index: true, // 访问 / 时渲染
        element: <Navigate to="dashboard" />, // 重定向到 dashboard
      },
      {
        index: true,
        path: 'dashboard',
        element: withRoute(<Dashboard />),
      },
      {
        path: 'post',
        children: [
          {
            path: '',
            index: true,
            element: withRoute(<Navigate to="list" />),
          },
          {
            path: 'list',
            element: withRoute(<PostList />),
          },
          {
            path: 'action',
            element: withRoute(<Action />),
          },
        ],
      },
    ],
  },
];
