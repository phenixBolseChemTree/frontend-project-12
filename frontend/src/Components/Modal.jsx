import React, { useState } from 'react';
// import Modal from 'react-modal';

// const getId = (() => {
//   let idChanell = 3;
//   return () => {
//     id += 1;
//     return id;
//   };
// })();


const Modal = ({ active, setActive }) => {
  // const [active, setActive] = useState(true);
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className="mb-3" onClick={(e) => e.stopPropagation()}>
        <h1>loream ipsum loream ipsum loream ipsum loream ipsum </h1>
        <h1>loream ipsum loream ipsum loream ipsum loream ipsum </h1>
        <h1>loream ipsum loream ipsum loream ipsum loream ipsum </h1>
        <h1>loream ipsum loream ipsum loream ipsum loream ipsum </h1>
      </div>
    </div>
  );
}
export default Modal;