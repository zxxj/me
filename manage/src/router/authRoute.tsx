import { useUserStore } from '@/store/user';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const token = useUserStore.getState().token;
  const location = useLocation();

  if (!token) {
    // 未登录,跳转至登录页,记录来源地址
    return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
  }

  // 已登录,正常渲染子组件
  return children;
};

export const withRoute = (element: JSX.Element) => {
  return <AuthRoute>{element}</AuthRoute>;
};
