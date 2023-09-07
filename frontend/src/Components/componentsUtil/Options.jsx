import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import ModalDelete from '../PersonalModal/ModalDelete';
import ModalRename from '../PersonalModal/ModalRename';
// import ModalRename from '../PersonalModal/ModalRename';

const Options =({socket, id, name}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open}
      >
        Toggle text
      </Button>
      <Fade in={open}>
        <div id="example-fade-text">
          <button onClick={() => (console.log('открываем модалку 1'))}><ModalDelete socket={socket} id={id} name={name} /></button>
          <button onClick={() => (console.log('открываем модалку 2'))}><ModalRename socket={socket} id={id} name={name} /></button>
        </div>
      </Fade>
    </>
  );
}

export default Options;