import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar'; 
import Home from './components/Home'; 
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import Dashboard from './components/Dashboard'; 
import Courses from './components/Courses'; 
import CourseDetail from './components/CourseDetail'; 
import Profile from './components/Profile'; 
import Settings from './components/Settings'; 
import PrivateRoute from './components/PrivateRoute'; 
import './App.css'; 

function App() { 
  return ( 
    <Router> 
      <div className="App"> 
        <Navbar /> 
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/dashboard" element={ 
            <PrivateRoute> 
              <Dashboard /> 
            </PrivateRoute> 
          } /> 
          <Route path="/courses" element={ 
            <PrivateRoute> 
              <Courses /> 
            </PrivateRoute> 
          } /> 
          <Route path="/course/:courseId" element={ 
            <PrivateRoute> 
              <CourseDetail /> 
            </PrivateRoute> 
          } /> 
          <Route path="/profile" element={ 
            <PrivateRoute> 
              <Profile /> 
            </PrivateRoute> 
          } /> 
          <Route path="/settings" element={ 
            <PrivateRoute> 
              <Settings /> 
            </PrivateRoute> 
          } /> 
        </Routes> 
      </div> 
    </Router> 
  ); 
} 

export default App;
