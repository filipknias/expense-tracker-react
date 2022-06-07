import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { startRequest, requestSuccess, requestFail } from './requestSlice';
import { timestamp } from '../../firebase';

const initialState = {
  expenses: [],
  income: [],
};

export const addNewEntry = createAsyncThunk('balance/addNewEntry', async ({ type, name, amount, uid, setOpen }, { dispatch }) => {
  try {
    // Save document in firestore
    dispatch(startRequest({ type: `${type}/add` }));
    const createdAt = timestamp.toDate().toDateString();
    const { id } = await addDoc(collection(db, 'entries'), { type, uid, name, amount, createdAt });
    dispatch(requestSuccess({ type: `${type}/add` }));
    setOpen(false);
    return { id, type, name, amount, uid, createdAt };
  } catch (err) {
    console.log(err)
    dispatch(requestFail({ type: `${type}/add` }));
  }
});

export const fetchBalance = createAsyncThunk('balance/fetchBalance', async ({ uid }, { dispatch }) => {
  try {
    // Get documents from firestore
    dispatch(startRequest({ type: 'balance/fetch' }));
    const expensesQuery = query(collection(db, "entries"), where("type", "==", 'expense'), where('uid', '==', uid));
    const expensesSnapshot = await getDocs(expensesQuery);
    const expenses = [];
    expensesSnapshot.forEach((doc) => expenses.push({ id: doc.id, ...doc.data() }));
    dispatch(requestSuccess({ type: 'balance/fetch' }));
    return { expenses, income: [] };
  } catch (err) {
    console.log(err)
    return dispatch(requestFail({ type: 'balance/fetch' }));
  }
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
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
    [fetchBalance.fulfilled] (state, { payload }) {
      const { expenses, income } = payload;
      state.expenses = expenses;
      state.income = income;
    },
  },
});

export const {  } = balanceSlice.actions;

export default balanceSlice.reducer;