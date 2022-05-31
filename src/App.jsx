import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
