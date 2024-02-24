import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type BackButtonProps = {
  path: string;
  label: string;
};

export const BackButton = ({ path, label }: BackButtonProps) => {
  return (
    <Button variant='link' className='font-normal w-full' size='sm' asChild>
      <Link to={path}>{label}</Link>
    </Button>
  );
};
