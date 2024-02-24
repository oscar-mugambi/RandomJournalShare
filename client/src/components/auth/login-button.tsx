import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const LoginButton = ({ children }: LoginButtonProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/');
  };

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  );
};
