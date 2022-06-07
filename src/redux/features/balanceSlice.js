import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import { startRequest, requestSuccess, requestFail } from './requestSlice';

const initialState = {
  expenses: [],
  income: [],
};

export const addNewExpense = createAsyncThunk('balance/addNewExpense', async ({ name, amount, setOpen }, { dispatch }) => {
  try {
    // Save document in firestore
    dispatch(startRequest({ type: 'expense/add' }));
    await addDoc(collection(db, 'expenses'), { name, amount });
    dispatch(requestSuccess({ type: 'expense/add' }));
    setOpen(false);

    return { name, amount };
  } catch (err) {
    console.log(err)
    return dispatch(requestFail({ type: 'expense/add', error: err.code }));
  }
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [addNewExpense.fulfilled] (state, { payload }) {
      state.expenses.push({ ...payload });
    },
  },
});

export const {  } = balanceSlice.actions;

export default balanceSlice.reducer;