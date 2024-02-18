import React, { useState,useEffect } from "react";
import './App.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Index from './components/Index';
import SignIn from "./components/SignIn";
import SignInStu from './components/SignInStu';
import SignInComp from "./components/SignInComp";
import SignUp from "./components/SignUp";
import SignUpStu from './components/SignUpStu';
import SignUpComp from "./components/SignUpComp";
import StuHome from './components/StuHome';
import CompHome from "./components/CompHome";
import CompVacancy from "./components/CompVacancy";

function App(){
  return(
    <Router>
      <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signinstu" element={<SignInStu/>}/>
          <Route path="/signincomp" element={<SignInComp/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signupstu" element={<SignUpStu/>}/>
          <Route path="/signupComp" element={<SignUpComp/>}/>
          <Route path="/stuhome" element={<StuHome/>}/>
          <Route path="/comphome" element={<CompHome/>}/>
          <Route path="/compvacancy" element={<CompVacancy/>}/>
      </Routes>
    </Router>
  );
}

export default App;