import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { loginUser, registerUser, logoutUser } from '@/api/authService';

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
    onSuccess: (data) => {
      console.log(data);
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
    onSuccess: (data) => {
      console.log(data);
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
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });
}
