import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../components/common/AuthProvider';
import goTo from './goTo';

const Redirect = ({ children }) => {
  const auth = useAuth();
  const { user } = auth.loggedIn;
  const location = useLocation();
  const { pathname } = location;

  if (user && pathname !== goTo.home) {
    return <Navigate to={goTo.home} />;
  }
  if (!user && pathname === goTo.home) {
    return <Navigate to={goTo.login} />;
  }
  return children;
};

export default Redirect;
