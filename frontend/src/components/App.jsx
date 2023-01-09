import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, ErrorBoundary } from '@rollbar/react';

import { AuthProvider } from './common/AuthProvider';
import { SocketProvider } from '../socket/socket';
import Redirect from '../routes/Redirect';
import Chats from './main/Chats';
import PageNotFound from './errorPage/PageNotFound';
import LoginPage from './login/LoginPage';
import Header from './common/Header';
import SignupPage from './signup/SignupPage';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_SECRET_KEY_ROLLBAR,
  environment: 'production',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Redirect>
        <Chats />
        <ToastContainer />
      </Redirect>),
  },
  {
    path: '/login',
    element: <Redirect><LoginPage /></Redirect>,
  },
  {
    path: '/signup',
    element: <Redirect><SignupPage /></Redirect>,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <div className="d-flex flex-column h-100">
            <Header />
            <RouterProvider router={router} />
          </div>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
