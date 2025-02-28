import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { NavigationProvider } from './Context/NavigationContext';
import { DataProvider } from './Context/DataContext';
import { ClaimsProvider } from './Context/ClaimsContext';
import { FollowupProvider } from './Context/FollowupContext';
import { IntakeProvider } from './Context/IntakeContext';
import { HistoricProvider } from './Context/HistoricContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <DataProvider>
            <ClaimsProvider>
              <FollowupProvider>
                <IntakeProvider>
                  <HistoricProvider>
                    <App/>
                  </HistoricProvider>
                </IntakeProvider>
              </FollowupProvider>
            </ClaimsProvider>
          </DataProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
