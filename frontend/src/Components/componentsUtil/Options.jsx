import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import ModalDelete from '../PersonalModal/ModalDelete';
import ModalRename from '../PersonalModal/ModalRename';
// import ModalRename from '../PersonalModal/ModalRename';

const Options = ({ socket, id, name }) => {
  const [open, setOpen] = useState(false);
  const myStyle = {
    position: 'absolute',
    inset: '0px auto auto 0px',
    transform: 'translate3d(-8px, 40px, 0px)',
  };
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open}
        className='flex-grow-0 dropdown-toggle dropdown-toggle-split btn'
      >
        <span className="visually-hidden">Управление каналом</span>
        {/* <div
          x-placement="bottom-start"
          aria-labelledby="react-aria7732657011-1"
          className="dropdown-menu"
          data-popper-reference-hidden="false"
          data-popper-escaped="false"
          data-popper-placement="bottom-start"
          style={myStyle}
        >
          <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
          <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
        </div> */}
      </button>
      <Fade in={open}>
        <div id="example-fade-text" role='group' className='d-flex dropdown btn-group'>
          <ModalDelete socket={socket} id={id} name={name} />
          <ModalRename socket={socket} id={id} name={name} />
        </div>
      </Fade>
    </>
  );
}

export default Options;