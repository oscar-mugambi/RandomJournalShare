import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/app/store';

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
import { useRegistration } from '@/hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@/redux/authSlice';
import { setUser } from '@/redux/userSlice';
import { BeatLoader } from 'react-spinners';

export const RegisterForm = () => {
  const {
    mutate: performRegister,
    data: userInfo,
    isPending: isRegistering,
    isSuccess: isRegisterSuccess,
    error: registerError,
  } = useRegistration();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    const url = '/auth/register';

    performRegister({
      url,
      requestBody: { username: values.username, email: values.email, password: values.password },
    });
  };

  if (isRegisterSuccess) {
    dispatch(setToken(userInfo.accessToken));
    dispatch(setUser(userInfo.data));

    setTimeout(() => {
      navigate('/home/');
    }, 500);
  }

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
          <FormError message={registerError?.message} />
          <Button disabled={isRegistering} type='submit' className='w-full'>
            {isRegistering ? <BeatLoader size={8} color='#ffffff' /> : <span>Register</span>}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
