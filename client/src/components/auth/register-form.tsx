import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CardWrapper from '@/components/auth/card-wrapper';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/auth/form-error';
import { FormSuccess } from '@/components/auth/form-success';
import { useLogin } from '@/hooks/useLogin';

export const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>('');
  const { mutate: performLogin, isPending: isLoginInProgress, error: loginError } = useLogin();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    const url = 'http://localhost:5000/user/login';

    performLogin({ url, requestBody: { email: values.email, password: values.password } });
  };

  return (
    <CardWrapper
      headerLabel='Start Your Journey with Us'
      backButtonLabel='Already part of the community?'
      backButtonPath='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <fieldset className='space-y-4'>
            <legend className='sr-only'>Login Information</legend>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <FormControl>
                    <Input {...field} id='name' placeholder='Ellen Ripley' autoComplete='off' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='email'
                      placeholder='ellen.ripley@alien.com'
                      type='email'
                      autoComplete='off'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id='password'
                      placeholder='xxxxxx'
                      type='password'
                      autoComplete='off'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <FormError message={loginError?.message} />
          <FormSuccess message={success} />
          <Button disabled={isLoginInProgress} type='submit' className='w-full'>
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
