import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/store';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!token) {
      timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [token]);

  if (!token && shouldRedirect) {
    return <Navigate to='/auth/login' replace />;
  }

  return <Outlet />;
};
