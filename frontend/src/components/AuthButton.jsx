import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const token = localStorage.getItem('userId');

  return (
    token
      ? <a href="/login"><Button onClick={auth.logOut}>{t('buttons.logOut')}</Button></a>
      : null
  );
};

export default AuthButton;
