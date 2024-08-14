import LoginForm from './Components/LoginForm/LoginForm';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import RegisterForm from './Components/RegisterForm/RegisterForm';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />  
          <Route path="/RegisterForm" element={<RegisterForm />} /> 
          <Route path="/Dashboard" element={<Dashboard />} /> 

          </Routes>
          </Router>
    </div>
  );
}

export default App;
