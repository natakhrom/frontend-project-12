import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../components/common/AuthProvider';

const Redirect = ({ children }) => {
  const auth = useAuth();
  const { user } = auth.loggedIn;
  const location = useLocation();
  const { pathname } = location;

  if (user && pathname !== '/') {
    return <Navigate to="/" />;
  }
  if (!user && pathname === '/') {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Redirect;
