import React from 'react';
import { Modal, Button } from 'react-bootstrap';

// модалка будет появляться с определенным контентом внутри.
// контент определяется от переданных данных
const RenameChannel = ({ handleClose }) => { // typeModal
  console.log(123);
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>RenameChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
};
export default RenameChannel;
