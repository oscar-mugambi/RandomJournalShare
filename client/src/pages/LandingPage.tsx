import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className='text-6xl font-semibold text-white drop-shadow-md'>
        Welcome to Random Journal
      </h1>
      <p className='text-white text-lg'>
        Embark on a journey of reflection and growth. Let's get started.
      </p>
      <div>
        <Button onClick={() => navigate('/auth/login')} variant='secondary' size='lg'>
          Sign in
        </Button>
      </div>
    </>
  );
};
