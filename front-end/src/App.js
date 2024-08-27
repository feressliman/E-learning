import Login from './Authentification/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './/Components/Dashboard/Dashboard';
import Register from './Authentification/Register';
import AddUser from './Users/AddUser';
import AfficherUser from './Users/AfficherUser';
import AfficherForm from './Formations/AfficherForm';
import AddForm from './Formations/AddForm';
import ModifierUser from './Users/ModifierUser';
import Profile from './Profil/Profile';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route path="/" element={<Login />} />  
          <Route path="/Register" element={<Register />} /> 
          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/AddUser" element={<AddUser />} /> 
          <Route path="/AfficherUser" element={<AfficherUser />} /> 
          <Route path="/AfficherForm" element={<AfficherForm/>} /> 
          <Route path="/AddForm" element={<AddForm />} /> 
          <Route path="/ModifierUser/:id" element={<ModifierUser />} />
          <Route path="/Profile" element={<Profile />} />






          </Routes>
          </Router>
    </div>
  );
}

export default App;
