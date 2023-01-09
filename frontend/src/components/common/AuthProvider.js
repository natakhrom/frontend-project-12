import {
  createContext,
  useContext,
  useState,
  useMemo,
} from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = localStorage.getItem('userId')
    ? { state: true, user: JSON.parse(localStorage.getItem('userId')) }
    : { state: false };

  const [loggedIn, setLoggedIn] = useState(auth);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ state: true, user: data });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn({ state: false });
  };

  const contex = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={contex}>
      {children}
    </AuthContext.Provider>
  );
};
