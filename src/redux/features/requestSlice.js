import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    startRequest(state, { payload }) {
      state.requests.push({
        type: payload.type,
        loading: true,
        isError: false,
      }); 
    },
    requestSuccess(state, { payload }) {
      state.requests = state.requests.filter(({ type }) => type !== payload.type);
    },  
    requestFail(state, { payload }) {
      state.requests = state.requests.map((request) => {
        if (payload.type === request.type) return { ...request, loading: false, isError: true };
        return request;
      });
    },
    deleteRequest(state, { payload }) {
      state.requests = state.requests.filter(({ type }) => type !== payload.type);
    },
  },
});

export const { startRequest, requestSuccess, requestFail, deleteRequest } = requestSlice.actions;

export default requestSlice.reducer;