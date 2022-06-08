import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
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
    const balanceQuery = query(collection(db, "entries"), where('uid', '==', uid));
    const balanceSnapshot = await getDocs(balanceQuery);
    const data = [];
    balanceSnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
    const expenses = data.filter(({ type }) => type === 'expense');
    const income = data.filter(({ type }) => type === 'income');
    dispatch(requestSuccess({ type: 'balance/fetch' }));
    return { expenses, income };
  } catch (err) {
    console.log(err)
    return dispatch(requestFail({ type: 'balance/fetch' }));
  }
});

export const deleteEntry = createAsyncThunk('balance/deleteEntry', async ({ type, id }) => {
  try {
    // Delete document from firestore
    await deleteDoc(doc(db, "entries", id));
    return { type, id };
  } catch (err) {
    console.log(err)
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
    [deleteEntry.fulfilled] (state, { payload }) {
      const { type, id } = payload;
      switch (type) {
        case 'expense': {
          state.expenses = state.expenses.filter((expense) => expense.id !== id);
          break;
        }
        case 'income': {
          state.income = state.income.filter((income) => income.id !== id);
          break;
        }
      } 
    },
  },
});

export const {  } = balanceSlice.actions;

export default balanceSlice.reducer;