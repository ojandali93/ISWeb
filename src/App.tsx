import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth } from './Context/AuthContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginScreen from './Screens/Authentcation/LoginScreen';
import HomeScreen from './Screens/Home/HomeScreen';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import SignupScreen from './Screens/Authentcation/SignupScreen';
import AccessCodeScreen from './Screens/Authentcation/AccessCodeScreen';
import ConfirmEmailScreen from './Screens/Authentcation/ConfirmEmailScreen';
import LogoutScreen from './Screens/Authentcation/LogoutScreen';

Amplify.configure(amplifyconfig)

function App() {

  const {validAccessCode, currentUser, grabCurrentUser} = useAuth()

  useEffect(() => {
    grabCurrentUser()
  }, [])

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            currentUser.username ? <HomeScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/auth/logout"
          element={
            currentUser.username != null ? <LogoutScreen /> : <Navigate to="/auth/login" />
          }
        />
        {/* Public routes */}
        <Route path="/auth/confirmation" element={<ConfirmEmailScreen />} />
        <Route path="/auth/login" element={<LoginScreen />} />
        <Route path="/auth/accessCode" element={<AccessCodeScreen />} />
        <Route
          path="/auth/signup"
          element={
            validAccessCode ? <SignupScreen /> : <Navigate to="/auth/accessCode" />
          }
        />
        <Route path="/auth/signup" element={<SignupScreen />} />
        <Route path="/auth/logout" element={<LoginScreen />} />
        <Route path="/external" element={<LoginScreen />} />
      </Routes>
    </div>
  );
}

export default App;
