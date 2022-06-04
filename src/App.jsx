import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from './redux/features/userSlice';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
      }
    });
  }, []);

  return (
    <BrowserRouter>  
      <Routes>
        <Route exact path="/" element={
          <ProtectedRoute isAuth={isAuth}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <AuthRoute isAuth={isAuth}>
            <Register />
          </AuthRoute>
        } />
        <Route path="/login" element={
          <AuthRoute isAuth={isAuth}>
            <Login />
          </AuthRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
