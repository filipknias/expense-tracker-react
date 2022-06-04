import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const createNewUser = createAsyncThunk('user/createNewUser', async ({ firstName, lastName, email, password, naviagate }, { rejectWithValue }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // Set user display name
    const newDisplayName = `${firstName} ${lastName}`;
    await updateProfile(user, { displayName: newDisplayName });
    // Save user in state
    const { uid, displayName } = auth.currentUser;
    // Redirect to dashboard
    naviagate('/');
    return { uid, email, displayName };
  } catch (err) {
    console.log(err)
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [createNewUser.pending] (state) {
      state.error = null;
      state.loading = true;
    },
    [createNewUser.fulfilled] (state, { payload }) {
      state.user = payload.user;
      state.loading = false;
    },
    [createNewUser.rejected] (state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
})

export const { } = userSlice.actions;

export default userSlice.reducer;