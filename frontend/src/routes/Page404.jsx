import img1 from '../img/error_404/404_1.jpeg';
import img2 from '../img/error_404/404_2.jpeg';
import img3 from '../img/error_404/404_3.jpeg';
import img4 from '../img/error_404/404_4.jpeg';
import img5 from '../img/error_404/404_5.jpeg';
import img6 from '../img/error_404/404_6.jpeg';

const Page404 = () => {
  const images = [img1, img2, img3, img4, img5, img6];
  const randIndx = Math.floor(Math.random() * images.length)

  return (
    <>
      <img src={images[randIndx]} alt="Error 404" />
      <h1>404</h1>
      <h2>Ничего не найдено</h2>
    </>
  );
}

export default Page404;