
import img from '../img/error_404/404_1.jpeg';
// import img from '../img/hexlet_human/error_404.jsx'

import { useTranslation } from "react-i18next";

const Page404 = () => {
  const { t } = useTranslation();
  // const images = [img1, img2, img3, img4, img5, img6];
  // const randIndx = Math.floor(Math.random() * images.length)

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