import { Outlet, useNavigate } from 'react-router-dom';
import LayoutHeader from './LayoutHeader';
import { logout } from '@/redux/authSlice';
import { useLogout } from '@/hooks/useLogin';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { deleteUser } from '@/redux/userSlice';

const Layout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.user?.user_id);
  const token = useAppSelector((state) => state.auth?.token);

  const { mutate: performLogout, isSuccess, error } = useLogout();

  const handleLogout = async () => {
    if (!userId || !token) {
      console.log('User ID not found');
      navigate('/auth/login');
      return;
    }

    performLogout({
      url: '/auth/logout',
      user_id: userId,
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
    <>
      <LayoutHeader handleLogout={handleLogout} />
      <div className='h-full'>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
