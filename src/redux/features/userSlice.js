import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';

const formatErrorMessage = (message) => {
  switch (message) {
    case 'auth/email-already-in-use': return "Email already in use";
    case 'auth/weak-password': return "Password should be at least 6 characters";
    case 'auth/invalid-email': return "Email should be valid address";
    default: return "Something went wrong";
  }
};

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
    return rejectWithValue(formatErrorMessage(err.code));
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