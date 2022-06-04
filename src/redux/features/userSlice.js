import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

const formatErrorMessage = (message) => {
  switch (message) {
    case 'auth/email-already-in-use': return "Email already in use";
    case 'auth/weak-password': return "Password should be at least 6 characters";
    case 'auth/invalid-email': return "Email should be valid address";
    case 'auth/wrong-password': return "Wrong email or password";
    case 'auth/user-not-found': return "Wrong email or password";
    default: return "Something went wrong";
  }
};

const initialState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

export const createNewUser = createAsyncThunk('user/createNewUser', async ({ firstName, lastName, email, password, navigate }, { rejectWithValue }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    // Set user display name
    const newDisplayName = `${firstName} ${lastName}`;
    await updateProfile(user, { displayName: newDisplayName });
    // Save user in state
    const { uid, displayName } = auth.currentUser;
    // Redirect to dashboard
    navigate('/');
    return { uid, email, displayName };
  } catch (err) {
    console.log(err)
    return rejectWithValue(formatErrorMessage(err.code));
  }
});

export const signInUser = createAsyncThunk('user/signInUser', async ({ email, password, navigate }, { rejectWithValue }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const { uid, displayName } = user;
    navigate('/');
    return { uid, email, displayName };
  } catch (err) {
    console.log(err)
    return rejectWithValue(formatErrorMessage(err.code));
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
      state.isAuth = true; 
    },
    logoutUser(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [createNewUser.pending] (state) {
      state.error = null;
      state.loading = true;
    },
    [createNewUser.fulfilled] (state, { payload }) {
      state.user = payload;
      state.loading = false;
      state.isAuth = true;
    },
    [createNewUser.rejected] (state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    [signInUser.pending] (state) {
      state.error = null;
      state.loading = true;
    },
    [signInUser.fulfilled] (state, { payload }) {
      state.user = payload;
      state.loading = false;
      state.isAuth = true;
    },
    [signInUser.rejected] (state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
})

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;