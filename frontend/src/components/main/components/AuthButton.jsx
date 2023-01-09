import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../common/AuthProvider';

const AuthButton = () => {
  const auth = useAuth();
  const { state } = auth.loggedIn;
  const { t } = useTranslation();

  return (
    state
      ? <a href="/login"><Button onClick={auth.logOut}>{t('buttons.logOut')}</Button></a>
      : null
  );
};

export default AuthButton;
