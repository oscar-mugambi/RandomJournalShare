import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { JournalEntryT, journalEntrySchema } from '@/schemas/journalSchema';
import { Button } from '@/components/ui/button';
import TipTap from '@/components/TipTap';
import { useAppSelector } from '@/app/store';
import { useCreateJournalEntry } from '@/hooks/useLogJournal';

const JournalEntry = () => {
  const userId = useAppSelector((state) => state.user.user?.user_id);
  const token = useAppSelector((state) => state.auth.token);
  const { mutate: createEntry, isPending, isError } = useCreateJournalEntry();

  const form = useForm<JournalEntryT>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: {
      title: '',
      content: '',
      mood: '',
      tags: '',
    },
  });

  if (isPending) {
    /**
     * TODO handle loading
     */

    console.log('is loading');
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

    let tagsArray: string[] = [];

    if (data.tags) {
      tagsArray = data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }

    createEntry({
      url: '/journals',
      token,
      data,
      user_id: userId,
    });
  }

  return (
    <main className='p-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default JournalEntry;
