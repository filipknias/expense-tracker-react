import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import { startRequest, requestSuccess, requestFail } from './requestSlice';

const initialState = {
  expenses: [],
  income: [],
};

export const addNewEntry = createAsyncThunk('balance/addNewEntry', async ({ type, name, amount, uid, createdAt, setOpen }, { dispatch }) => {
  try {
    // Save document in firestore
    dispatch(startRequest({ type: `${type}/add` }));
    await addDoc(collection(db, 'entries'), { type, uid, name, amount, createdAt });
    dispatch(requestSuccess({ type: `${type}/add` }));
    setOpen(false);
    return { type, name, amount, uid, createdAt: createdAt.toISOString() };
  } catch (err) {
    console.log(err)
    return dispatch(requestFail({ type: `${type}/add` }));
  }
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [addNewEntry.fulfilled] (state, { payload }) {
      switch (payload.type) {
        case 'expense': {
          state.expenses.push({ ...payload });
          break;
        }
        case 'income': {
          state.income.push({ ...payload });
          break;
        }
      }  
    },
  },
});

export const {  } = balanceSlice.actions;

export default balanceSlice.reducer;