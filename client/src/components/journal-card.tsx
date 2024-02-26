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
import { useAppSelector } from '@/app/store';
import { useDeleteJournal } from '@/hooks/useDeleteJournal';
import { formatter } from '@/lib/utils';
import { toast } from './ui/use-toast';

const JournalCard = ({ journal }: { journal: JournalEntry }) => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth?.token);

  const { mutate: deleteJournal, isError, isSuccess } = useDeleteJournal();

  const url = '/journals';

  const handleDeleteJournal = (journalId: number) => {
    deleteJournal({ url, journalId, token });
  };

  if (isSuccess) {
    toast({
      title: 'Journal Deleted',
      description: `${journal.title} was successfully deleted.`,
    });
  }

  if (isError) {
    /**
     * TODO handle error
     */
  }

  return (
    <Card className='min-h-fit'>
      <CardHeader className='flex-row gap-4 items-center'>
        <div>
          <CardTitle className='mb-1'>{journal.title}</CardTitle>
          <CardDescription>{formatter.format(new Date(journal.created_at))}</CardDescription>
          <CardContent className='p-0 mt-2 line-clamp-1'>
            <div dangerouslySetInnerHTML={{ __html: journal.content }}></div>
          </CardContent>
          <CardFooter className='p-0 space-x-6 mt-4'>
            <Button
              onClick={() => navigate(`/home/journal/${journal.entry_id}`)}
              variant={'default'}
            >
              View Entry
            </Button>
            <Button onClick={() => handleDeleteJournal(journal.entry_id)} variant={'destructive'}>
              Delete Entry
            </Button>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  );
};

export default JournalCard;
