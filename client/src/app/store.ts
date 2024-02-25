import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from '@/redux/authSlice';
import userSlice from '@/redux/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { auth: authSlice, user: userSlice },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
