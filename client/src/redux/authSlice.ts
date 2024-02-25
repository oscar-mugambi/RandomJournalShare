import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = '';
    },
  },
});

export const { logout, setToken } = authSlice.actions;

export default authSlice.reducer;
