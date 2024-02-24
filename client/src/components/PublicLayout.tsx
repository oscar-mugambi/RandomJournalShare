import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-400 via-purple-500'>
      <div className='space-y-6'>
        <Outlet />
      </div>
    </main>
  );
};

export default PublicLayout;
