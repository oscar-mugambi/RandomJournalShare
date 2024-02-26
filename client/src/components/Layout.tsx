import { Outlet } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import { logout } from '@/redux/authSlice';
import { useLogout } from '@/hooks/useLogin';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteUser } from '@/redux/userSlice';

const Layout = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.user?.user_id);
  const token = useAppSelector((state) => state.auth.token);

  const { mutate: performLogout, isSuccess, error } = useLogout();

  const handleLogout = async () => {
    performLogout({
      url: '/auth/logout',
      user_id: userId!,
      token,
    });
  };

  if (isSuccess) {
    dispatch(logout());
    dispatch(deleteUser());
  }

  if (error) {
    console.log('Error:', error);
  }

  return (
    <div className='h-full'>
      <LayoutHeader handleLogout={handleLogout} />
      <Outlet />
    </div>
  );
};

export default Layout;
