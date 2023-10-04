
import React from 'react'
import img from '../assets/error_404.jpeg';

import { useTranslation } from "react-i18next";

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='text-center'>
        <img className='img-fluid h-25' src={img} alt="Error 404" />
        <h1 className="h4 text-muted">{t('error404Page.pageIsNotFound')}</h1>
        <p className="text-muted">{t('error404Page.ButYouCanMoveOn')} <a href="/">{t('error404Page.onMainPage')}</a> </p>
      </div>
    </>
  );
}

export default Page404;