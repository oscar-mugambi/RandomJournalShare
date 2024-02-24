import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { JournalEntry } from '@/types';
import { Button } from './ui/button';

const JournalCard = ({ journal }: { journal: JournalEntry }) => {
  const navigate = useNavigate();
  return (
    <Card className='flex flex-col justify-between w-10/12 min-w-80'>
      <CardHeader className='flex-row gap-4 items-center'>
        <div>
          <CardTitle className='mb-1'>{journal.title}</CardTitle>
          <CardDescription>{journal.created_at}</CardDescription>
          <CardContent className='p-0 mt-2 line-clamp-1'>{journal.content}</CardContent>

          <CardFooter className='p-0 space-x-6 mt-4'>
            <Button onClick={() => navigate(`${journal.entry_id}`)} variant={'default'}>
              View Entry
            </Button>
            <Button onClick={() => {}} variant={'destructive'}>
              Delete Entry
            </Button>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  );
};

export default JournalCard;
