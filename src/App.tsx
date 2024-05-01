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
import LoadingScreen from './Screens/LoadingScreen';
import { useData } from './Context/DataContext';
import ClaimsCollabScreen from './Screens/Claims/ClaimsCollabScreen';
import ClaimsAveaScreen from './Screens/Claims/ClaimsAveaScreen';
import ClaimsAvailityScreen from './Screens/Claims/ClaimsAvailityScreen';

Amplify.configure(amplifyconfig)

function App() {

  const {validAccessCode, currentUser, authLoading, grabCurrentUser} = useAuth()
  const {collectAllData} = useData()

  useEffect(() => {
    grabCurrentUser()
  }, [])

  useEffect(() => {
    if(currentUser.username){
      collectAllData()
    }
  }, [currentUser])

  return (
    <div className='w-screen h-screen flex-column bg-slate-800'>
      <Routes>
        <Route
          path="/"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <HomeScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/intellachat"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <IntellachatScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/historic"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <HistoricScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/external"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <ExternalScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <ClaimsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims/collab"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <ClaimsCollabScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims/avea"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <ClaimsAveaScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/availityScreen"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <ClaimsAvailityScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/follow-up"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <FollowUpScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/accounts"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <AccountsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/tickets"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <TicketsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/help"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <SupportScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/settings"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <SettingsScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/about"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username ? <AboutScreen /> : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/auth/logout"
          element={
            authLoading ? <LoadingScreen /> : currentUser.username != null ? <LogoutScreen /> : <Navigate to="/auth/login" />
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
