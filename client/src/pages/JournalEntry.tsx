import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { JournalEntryT, journalEntrySchema } from '@/schemas/journalSchema';
import { Button } from '@/components/ui/button';
import TipTap from '@/components/TipTap';
import { useAppSelector } from '@/app/store';
import { useCreateJournalEntry } from '@/hooks/useLogJournal';
import { useNavigate } from 'react-router-dom';

const JournalEntry = () => {
  const userId = useAppSelector((state) => state.user.user?.user_id);
  const token = useAppSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { mutate: createEntry, isPending, isError, isSuccess } = useCreateJournalEntry();

  const form = useForm<JournalEntryT>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: {
      title: '',
      content: '',
      mood: '',
      tags: '',
    },
  });

  if (isSuccess) {
    navigate('/home');
  }

  if (isPending) {
    /**
     * TODO handle loading
     */
  }

  if (isError) {
    /**
     * TODO handle error
     */
    console.log('is error');
  }

  function onSubmit(data: JournalEntryT) {
    if (!userId || !token) {
      console.log('You are not logged in');
      return;
    }

    createEntry({
      url: '/journals',
      token,
      data,
      user_id: userId,
    });
  }

  return (
    <main className='h-full flex flex-col justify-center bg-slate-200'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col justify-center w-1/2 mx-auto gap-3 border-2 border-gray-200 p-10 rounded-lg bg-gray-50 relative top-[-40px]'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <TipTap description={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='mood'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter tags separated by commas' />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className='w-fit' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default JournalEntry;
