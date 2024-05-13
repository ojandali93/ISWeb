import React, { useCallback, useEffect, useState } from 'react';
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
import IntakeAnalytivsScreen from './Screens/Analytics/IntakeAnalytivsScreen';
import ClaimsAvailityScreen from './Screens/Claims/ClaimsAvailityScreen';
import Historic2Screen from './Screens/Historic/Historic2Screen';
import Historic1Screen from './Screens/Historic/Historic1Screen';
import FollowupCollabScreen from './Screens/FollowUp/FollowupCollabScreen';
import FollowupAveaScreen from './Screens/FollowUp/FollowupAveaScreen';
import BillingAnalyticsScreen from './Screens/Analytics/BillingAnalyticsScreen';

Amplify.configure(amplifyconfig)

const TIMEOUT = 20 * 60 * 1000;

function App() {

  const {validAccessCode, currentUser, authLoading, grabCurrentUser, currentProfile, signOutUser} = useAuth()
  const {collectAllData} = useData()

  const [isActive, setIsActive] = useState(true);
  const [timer, setTimer] = useState(TIMEOUT);

  useEffect(() => {
    grabCurrentUser()
  }, [])

  useEffect(() => {
    if(currentUser.username){
      collectAllData()
    }
  }, [currentUser])

  const handleActivity = useCallback(() => {
    setIsActive(true);
    setTimer(TIMEOUT);
  }, []);

  useEffect(() => {
    if (isActive && timer === 0) {
      // Do something after inactivity, like logout the user
      setIsActive(false);
      if(currentProfile.department != 'dev'){
        signOutUser()
      }
    }
  }, [isActive, timer]);

  useEffect(() => {
    // Events that will reset the timer
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('click', handleActivity);

    let interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1000 : 0));
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [handleActivity]);

  return (
    <div className='w-screen h-screen flex-column bg-slate-800'>
      <Routes>
        <Route
          path="/"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? currentProfile.department === 'billing'
                      ? <Navigate to="/follow-up/collab" />
                      : <HomeScreen /> 
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/intake-analytics"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (currentProfile.department === 'intake' || 
                    currentProfile.department === 'administration' || 
                    currentProfile.department === 'dev' ) && 
                    (currentProfile.privileges === 'manager' || 
                    currentProfile.privileges === 'admin' || 
                    currentProfile.privileges === 'dev' ||
                    currentProfile.privileges === 'owner' )
                      ? <IntakeAnalytivsScreen /> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/intellachat"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' 
                    )
                    ? <IntellachatScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/historic"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' 
                    )
                      ? <HistoricScreen /> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/historic/prefix/:prefix_id/:network"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' 
                    )
                      ? <Historic2Screen /> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/historic/user/:prefix_id"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' 
                    )
                      ? <Historic1Screen /> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/external"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' 
                    )
                      ? <ExternalScreen /> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' ||
                      currentProfile.department === 'billing' 
                    )
                      ? <ClaimsScreen />
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/availty"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' ||
                      currentProfile.department === 'billing' 
                    )
                      ? <ClaimsScreen/> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims/collab"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' ||
                      currentProfile.department === 'billing' 

                    )
                      ? <ClaimsCollabScreen /> 
                      : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/claims/avea"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.privileges === 'admin' || 
                      currentProfile.privileges === 'owner' || 
                      currentProfile.privileges === 'dev' ||
                      currentProfile.department === 'billing'
                    )
                    ? <ClaimsAveaScreen />
                    : <Navigate to="/" /> 
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/availityScreen"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? <ClaimsAvailityScreen />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/follow-up"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.department === 'dev' ||
                      currentProfile.department === 'administration' || 
                      currentProfile.department === 'billing'
                    )
                    ? <FollowupCollabScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/follow-up/collab"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.department === 'dev' ||
                      currentProfile.department === 'administration' || 
                      currentProfile.department === 'billing'
                    )
                    ? <FollowupCollabScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/follow-up/avea"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.department === 'dev' ||
                      currentProfile.department === 'administration' || 
                      currentProfile.department === 'billing'
                    )
                    ? <FollowupAveaScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/analytics/billing"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.department === 'dev' ||
                      currentProfile.department === 'administration' || 
                      currentProfile.department === 'billing'
                    )
                    ? <BillingAnalyticsScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/accounts"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (
                      currentProfile.department === 'admin' || 
                      currentProfile.department === 'dev' 
                    ) 
                    ? <AccountsScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/tickets"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? (currentProfile.department === 'dev' ) 
                    ? <TicketsScreen /> 
                    : <Navigate to="/" />
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/help"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? <SupportScreen /> 
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/settings"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? <SettingsScreen /> 
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/about"
          element={
            authLoading 
              ? <LoadingScreen /> 
              : currentUser.username 
                  ? <AboutScreen /> 
                  : <Navigate to="/auth/login" />
          }
        />
        <Route
          path="/auth/logout"
          element={
            authLoading 
              ? <LoadingScreen />  
              : currentUser.username != null 
                  ? <LogoutScreen /> 
                  : <Navigate to="/auth/login" />
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
