import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "./components/Register";
import WebcamCapture from './components/Webcamcapture';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import MainPage from './components/MainPage';
import Verify from './components/Verify';


const  App= ()=>{

  return (
    <Router>
      <Routes>
        <Route path ="register/"  element= {<Register/>} />
        <Route path ="register_image/" element ={<WebcamCapture/>}/>
        <Route path ="login/" element = {<Login/>}/>
        <Route path="verify/" element={
          <ProtectedRoutes>
            <Verify/>
          </ProtectedRoutes>
        }/>

          <Route path="mainpage/" element={
            <ProtectedRoutes>
                <MainPage />
            </ProtectedRoutes>
          }/>
        </Routes>

    </Router>
  );
}

export default App;
