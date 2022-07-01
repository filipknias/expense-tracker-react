import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase';
import { addDoc, collection, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";
import { startRequest, requestSuccess, requestFail } from './requestSlice';
import { timestamp } from '../../firebase';

const initialState = {
  expenses: [],
  income: [],
};

const parseEntriesDateToString = (entries) => {
  return entries.map((entry) => {
    return { ...entry, createdAt: entry.createdAt.toString() };
  }); 
};

export const addNewEntry = createAsyncThunk('balance/addNewEntry', async ({ type, name, amount, uid, setOpen }, { dispatch }) => {
  try {
    // Save document in firestore
    dispatch(startRequest({ type: `${type}/add` }));
    const createdAt = timestamp;
    const { id } = await addDoc(collection(db, 'entries'), { type, uid, name, amount, createdAt });
    dispatch(requestSuccess({ type: `${type}/add` }));
    setOpen(false);
    return { id, type, name, amount, uid, createdAt: createdAt.toString() };
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
    // Parse created at date 
    const parsedData = parseEntriesDateToString(data); 
    // Filter entries to their own arrays
    const expenses = parsedData.filter(({ type }) => type === 'expense');
    const income = parsedData.filter(({ type }) => type === 'income');
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

export const resetBalance = createAsyncThunk('balance/resetBalance', async ({ uid, setOpen }, { dispatch }) => {
  try {
    // Delete documents from firestore
    dispatch(startRequest({ type: 'balance/reset' }));
    const entriesQuery = query(collection(db, "entries"), where('uid', '==', uid));
    const entriesSnapshot = await getDocs(entriesQuery);
    entriesSnapshot.forEach(async(doc) => await deleteDoc(doc.ref));
    dispatch(requestSuccess({ type: 'balance/reset' }));
    setOpen(false);
  } catch (err) {
    console.log(err);
    dispatch(requestFail({ type: 'balance/reset' }));
  }
});

export const sortEntries = createAsyncThunk('balance/sortEntries', async ({ uid, type, sortBy }) => {
  try {
    // Get sorted documents from firestore
    const entriesQuery = query(collection(db, "entries"), where('uid', '==', uid), where('type', '==', type), orderBy(sortBy, 'desc'));
    const entriesSnapshot = await getDocs(entriesQuery);
    const entries = [];
    entriesSnapshot.forEach((doc) => entries.push({ id: doc.id, ...doc.data() }));
    const parsedEntries = parseEntriesDateToString(entries);
    return { type, entries: parsedEntries };
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
    [resetBalance.fulfilled] (state) {
      state.expenses = [];
      state.income = [];
    },
    [sortEntries.fulfilled] (state, { payload }) {
      switch (payload.type) {
        case 'expense': {
          state.expenses = payload.entries;
          break;
        }
        case 'income': {
          state.income = payload.entries;
          break;
        }
      } 
    }
  },
});

export const { } = balanceSlice.actions;

export default balanceSlice.reducer;