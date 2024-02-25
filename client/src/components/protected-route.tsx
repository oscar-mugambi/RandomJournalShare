import { useAppSelector } from '@/app/store';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to='/auth/login' replace />;
  }

  return <Outlet />;
};
