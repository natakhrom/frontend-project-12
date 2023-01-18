import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';

import { AuthProvider } from './common/AuthProvider';
import { ApiProvider } from '../api/api';
import Redirect from '../routes/Redirect';
import Chats from './main/Chats';
import PageNotFound from './errorPage/PageNotFound';
import LoginPage from './login/LoginPage';
import Header from './common/Header';
import SignupPage from './signup/SignupPage';
import goTo from '../routes/goTo';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_SECRET_KEY_ROLLBAR,
  environment: 'production',
};

const router = createBrowserRouter([
  {
    path: goTo.home,
    element: (
      <Redirect>
        <Chats />
        <ToastContainer />
      </Redirect>),
  },
  {
    path: goTo.login,
    element: <Redirect><LoginPage /></Redirect>,
  },
  {
    path: goTo.signup,
    element: <Redirect><SignupPage /></Redirect>,
  },
  {
    path: goTo.other,
    element: <PageNotFound />,
  },
]);

const socket = io();

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <ApiProvider socket={socket}>
          <div className="d-flex flex-column h-100">
            <Header />
            <RouterProvider router={router} />
          </div>
        </ApiProvider>
      </AuthProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
