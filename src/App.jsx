import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';

const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
