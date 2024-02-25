import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-someColorOrGradient'>
      <h1 className='text-6xl font-semibold text-white drop-shadow-md text-center'>
        Welcome to Random Journal
      </h1>
      <p className='text-white text-lg text-center mt-4'>
        Embark on a journey of reflection and growth. Let's get started.
      </p>

      <Button
        className='mt-8'
        onClick={() => navigate('/auth/login')}
        variant='secondary'
        size='lg'
      >
        Sign in
      </Button>
    </div>
  );
};
