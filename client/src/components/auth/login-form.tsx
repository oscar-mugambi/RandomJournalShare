import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { LoginSchema } from '@/schemas';
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
import { useLogin } from '@/hooks/useLogin';
import { setToken } from '@/redux/authSlice';
import { setUser } from '@/redux/userSlice';
import { useAppDispatch } from '@/app/store';
import { BeatLoader } from 'react-spinners';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    mutate: performLogin,
    data: userInfo,
    isPending: isLoginInProgress,
    isSuccess: isLoginSuccess,
    error: loginError,
  } = useLogin();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'furiosa@mail.com',
      password: '11111',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    const url = '/auth/login';

    performLogin({
      url,
      requestBody: { email: values.email, password: values.password },
    });
  };

  if (isLoginSuccess) {
    dispatch(setToken(userInfo.accessToken));
    dispatch(setUser(userInfo.data));

    setTimeout(() => {
      navigate('/home/');
    });
  }

  return (
    <CardWrapper
      headerLabel='Continue where you left off'
      backButtonLabel='Need to create an account?'
      backButtonPath='/auth/register'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <fieldset className='space-y-4'>
            <legend className='sr-only'>Login Information</legend>
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
                      placeholder='marty.mcfly@mail.com'
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
                      placeholder='password'
                      type='xxxxxx'
                      autoComplete='off'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <FormError message={loginError?.message} />
          <Button disabled={isLoginInProgress} type='submit' className='w-full'>
            {isLoginInProgress ? <BeatLoader size={8} color='#ffffff' /> : <span>Sign in</span>}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
