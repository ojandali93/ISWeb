import React, { useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
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
import ForgotPasswordScreen from './Screens/Authentcation/ForgotPasswordScreen';
import IntellachatScreen from './Screens/Intellachat/IntellachatScreen';
import HistoricScreen from './Screens/Historic/HistoricScreen';
import ExternalScreen from './Screens/External/ExternalScreen';
import ClaimsScreen from './Screens/Claims/ClaimsScreen';
import FollowUpScreen from './Screens/FollowUp/FollowUpScreen';
import AccountsScreen from './Screens/Accounts/AccountsScreen';
import TicketsScreen from './Screens/Tickets/TicketsScreen';
import SupportScreen from './Screens/Support/SupportScreen';
import SettingsScreen from './Screens/Settings/SettingsScreen';
import AboutScreen from './Screens/About/AboutScreen';

Amplify.configure(amplifyconfig)

function App() {

  const {validAccessCode, currentUser, grabCurrentUser} = useAuth()

  useEffect(() => {
    grabCurrentUser()
  }, [])

  return (
    <div className='w-screen h-screen flex-column bg-slate-800'>
      <Routes>
        <Route
          path="/"
          element={
            currentUser.username ? <HomeScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/intellachat"
          element={
            currentUser.username ? <IntellachatScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/historic"
          element={
            currentUser.username ? <HistoricScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/external"
          element={
            currentUser.username ? <ExternalScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims"
          element={
            currentUser.username ? <ClaimsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/follow-up"
          element={
            currentUser.username ? <FollowUpScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/accounts"
          element={
            currentUser.username ? <AccountsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/tickets"
          element={
            currentUser.username ? <TicketsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/help"
          element={
            currentUser.username ? <SupportScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/settings"
          element={
            currentUser.username ? <SettingsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/about"
          element={
            currentUser.username ? <AboutScreen /> : <Navigate to="/auth/login" />
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
        <Route path="/auth/forgotPassword" element={<ForgotPasswordScreen />} />
        <Route path="/auth/accessCode" element={<AccessCodeScreen />} />
        <Route
          path="/auth/signup"
          element={
            validAccessCode ? <SignupScreen /> : <Navigate to="/auth/accessCode" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
