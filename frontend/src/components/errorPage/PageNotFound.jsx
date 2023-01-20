import React from 'react';
import { useTranslation } from 'react-i18next';

import goTo from '../../routes/goTo';

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('titles.pageNotFound')}
        className="img-fluid h-25"
        src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
      />
      <h4 className="text-muted">
        {t('titles.pageNotFound')}
      </h4>
      <p className="text-muted">
        {t('links.text')}
        {' '}
        <a href={goTo.home}>
          {t('links.homePage')}
        </a>
      </p>
    </div>
  );
};

export default PageNotFound;
