import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../components/common/AuthProvider';

const Redirect = ({ children }) => {
  const auth = useAuth();
  const { state } = auth.loggedIn;
  console.log(state);
  const location = useLocation();
  const { pathname } = location;

  if (state && pathname !== '/') {
    return <Navigate to="/" />;
  }
  if (!state && pathname === '/') {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Redirect;
