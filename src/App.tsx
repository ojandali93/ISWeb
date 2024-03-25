import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from './Context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from './Screens/Authentcation/LoginScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig)

function App() {

  const {authLoading, currentUser, grabCurrentUser} = useAuth()

  useEffect(() => {
    grabCurrentUser()
  }, [])

  return (
    <div>
      <BrowserRouter>
        {/* {
          authLoading
            ? <p className='text-3xl font-bold'>Loading</p>
            : currentUser.username === null
                ? <p className='text-3xl font-bold'>Not Logged In</p>
                : <p className='text-3xl font-bold'>Logged In</p>
        } */}
        <Routes>
          <Route
            path="/"
            element={
              currentUser.username ? <HomeScreen /> : <Navigate to="/auth/login" />
            }
          />
          <Route
            path="/external"
            element={
              currentUser.username ? <HomeScreen /> : <Navigate to="/auth/login" />
            }
          />
          {/* Public routes */}
          <Route path="/auth/login" element={<LoginScreen />} />
          <Route path="/auth/logout" element={<LoginScreen />} />
          <Route path="/external" element={<LoginScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
