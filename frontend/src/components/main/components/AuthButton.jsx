import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../common/AuthProvider';
import goTo from '../../../routes/goTo';

const AuthButton = () => {
  const auth = useAuth();
  const { user } = auth.loggedIn;
  const { t } = useTranslation();

  return (
    user
      ? <a href={goTo.login}><Button onClick={auth.logOut}>{t('buttons.logOut')}</Button></a>
      : null
  );
};

export default AuthButton;
