import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import balanceSlice from './features/balanceSlice';
import requestSlice from './features/requestSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    balance: balanceSlice,
    requests: requestSlice,
  },
});