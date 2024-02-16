import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import img from '../assets/404_3.jpg';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img className="img-fluid h-25" src={img} alt="Error 404" />
      <h1 className="h4 text-muted">{t('error404Page.pageIsNotFound')}</h1>
      <p className="text-muted">
        {t('error404Page.ButYouCanMoveOn')}
        {' '}
        <Link to="/">{t('error404Page.onMainPage')}</Link>
        {' '}
      </p>
    </div>
  );
};

export default Page404;
