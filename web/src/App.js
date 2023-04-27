import { useState } from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Signin from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './pages/ProtectedRoute';
// import SharedProductLayout from './pages/SharedProductLayout';
import Error from './pages/Error';

function App() {
  const [user,setUser]=useState("")
  return (
    <div className="App">
      
  <BrowserRouter>
  {/* <Login/> */}
    <Routes>
      <Route  path='/employeedashboard' element={<Home/>}/>
      <Route  path='/admindashboard' element={<Dashboard user={user}/>}/>
      <Route  path='/login' element={<Login setUser={setUser}/>}/>
      <Route  path='/register' element={<Signin/>}/>
    </Routes> 
 </BrowserRouter> 
</div>
  );
}

export default App;



 

   