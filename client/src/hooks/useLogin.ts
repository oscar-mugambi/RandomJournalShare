import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { loginUser, registerUser, logoutUser } from '@/api/authService';
import { toast } from '@/components/ui/use-toast';

interface LoginRequestBody {
  email: string;
  password: string;
}
interface RegisterRequestBody {
  username: string;
  email: string;
  password: string;
}

interface LoginMutationVariables {
  url: string;
  requestBody: LoginRequestBody;
}
interface RegistrationMutationVariables {
  url: string;
  requestBody: RegisterRequestBody;
}
interface LogoutMutationVariables {
  url: string;
  user_id: number;
  token: string;
}

export function useLogin(): UseMutationResult<any, Error, LoginMutationVariables> {
  return useMutation({
    mutationFn: ({ url, requestBody }: LoginMutationVariables) => loginUser(url, requestBody),
    onSuccess: () => {
      toast({
        title: 'Welcome!',
        description: 'You have successfully logged in. Happy journaling!',
      });
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });
}
export function useLogout(): UseMutationResult<any, Error, LogoutMutationVariables> {
  return useMutation({
    mutationFn: ({ url, user_id, token }: LogoutMutationVariables) =>
      logoutUser(url, user_id, token),
    onSuccess: () => {
      toast({
        title: 'Hope to see you back!',
        description: 'You have been logged out. We hope to see you back soon!',
      });
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });
}
export function useRegistration(): UseMutationResult<any, Error, RegistrationMutationVariables> {
  return useMutation({
    mutationFn: ({ url, requestBody }: RegistrationMutationVariables) =>
      registerUser(url, requestBody),
    onSuccess: () => {
      toast({
        title: 'Registration Successful!',
        description: 'Welcome to the community! Your journey begins now.',
      });
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });
}
