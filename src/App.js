import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Dashboard from "./Views/Dashboard/Dashboard";
import Expenses from "./Views/Expenses/Expenses";
import Incomes from "./Views/Income/Income";
import '@fortawesome/fontawesome-free/css/all.min.css';


import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/expenses" element={<Expenses />}/>
        <Route path="/incomes" element={<Incomes />}/>
      </Routes>
    </Router>
  );
};

export default App;
