import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';

import AuthContext from '../context/authContext';
import Chats from './Chats';
import PageNotFound from './PageNotFound';
import LoginPage from './LoginPage';
import Header from './Header';
import SignupPage from './SignupPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('userId');
  const location = useLocation();

  return (
    token
      ? children
      : <Navigate to="/login" state={{ from: location }} />
  );
};

const rollbarConfig = {
  accessToken: 'c813bf740b8543aba49e8de83812a3ae',
  environment: 'production',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <Chats />
                    <ToastContainer />
                  </PrivateRoute>
                )}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
