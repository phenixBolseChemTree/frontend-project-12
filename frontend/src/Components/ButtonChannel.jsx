import { useState } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../redux/chatSlice';
import MyModal from './СhannelsModal';
import cn from 'classnames'
import { useTranslation } from 'react-i18next';
const ButtonChannel = ({ socket, id, name, removable }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const currentChannelId = useSelector(state => state.app.currentChannelId);
  const isSelected = currentChannelId === id
  const btnClassesPart1 = cn('w-100 rounded-0 text-start btn border-0', {
    'bg-secondary text-white': isSelected, // Если selectedChannel === id, добавьте классы для серой кнопки и белого текста
  });

  const handleSetChannet = (id) => {
    dispatch(setCurrentChannelId(id));
  }

  const closeModal = () => {
    console.log('состояние закрылось');
    setShowModal(false);
  };

  const openModal = (action) => {
    console.log('состояние открылось');
    setShowModal(action);
  };

  return (
    <>
      {!removable && (
        <button
          onClick={() => handleSetChannet(id)}
          type="button"
          className={btnClassesPart1}>
          <span className="me-1">#</span>{name}
        </button>
      )}
      {removable && (
        <><ButtonGroup className="d-flex justify-content-start">
          <Button
            style={{ color: 'black', background: 'white' }}
            className={btnClassesPart1} // нужно привязать событие к кнопке Dropdown а не той что в ChannelsModal
            onClick={() => handleSetChannet(id)}><span className="me-1">#</span>{name}</Button>
          <DropdownButton title="" style={{ color: 'black', background: 'white' }} as={ButtonGroup} id="bg-nested-dropdown">
            <Dropdown.Item onClick={() => openModal('delete')} eventKey="1">{t('dropdownBar.delete')}</Dropdown.Item>
            <Dropdown.Item onClick={() => openModal('rename')} eventKey="2">{t('dropdownBar.rename')}</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup><MyModal socket={socket} id={id} showModal={showModal} closeModal={closeModal} /></>
      )}
    </>
  );
}

export default ButtonChannel;
