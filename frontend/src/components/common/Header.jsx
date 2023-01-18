import { useTranslation } from 'react-i18next';

import AuthButton from '../main/components/AuthButton';
import goTo from '../../routes/goTo';

const Header = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href={goTo.home}>{t('links.hexlet')}</a>
        <AuthButton />
      </div>
    </nav>
  );
};

export default Header;
