import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
// import ChannelsModal from '../C÷omponents/ChannelsModal';
// import ModalDelete from '../Components/modal/ModalDelete'
// import ModalRename from '../Components/modal/ModalRename'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../Redux/chatSlice';
import cn from 'classnames'
const ButtonChannel = ({ socket, id, name, removable, channels }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector(state => state.app.currentChannelId);
  const isSelected = currentChannelId === id
  const btnClassesPart1 = cn('w-100 rounded-0 text-start btn border-0', {
    'bg-secondary text-white': isSelected, // Если selectedChannel === id, добавьте классы для серой кнопки и белого текста
  });
  // const btnClassesPart2 = 

  const handleSetChannet = (id) => {
    dispatch(setCurrentChannelId(id));
  }

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
        <ButtonGroup className="d-flex justify-content-start">
          <Button
            style={{ color: 'black', background: 'white' }}
            className={btnClassesPart1} // нужно привязать событие к кнопке Dropdown а не той что в ChannelsModal
            onClick={() => handleSetChannet(id)}><span className="me-1">#</span>{name}</Button>
          <DropdownButton title="" style={{ color: 'black', background: 'white' }} as={ButtonGroup} id="bg-nested-dropdown">
            {/* <Dropdown.Item eventKey="1"><ModalDelete action={'delete'} id={id} socket={socket} /></Dropdown.Item> */}
            {/* <Dropdown.Item eventKey="2"><ModalRename action={'rename'} id={id} socket={socket} channels={channels} /></Dropdown.Item> */}
            {/* <Dropdown.Item eventKey="1"><ChannelsModal action={'delete'} id={id} socket={socket} /></Dropdown.Item>
            <Dropdown.Item eventKey="2"><ChannelsModal action={'rename'} id={id} socket={socket} channels={channels} /></Dropdown.Item> */}
            <Dropdown.Item eventKey="1">123</Dropdown.Item>
            <Dropdown.Item eventKey="2">321</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      )}
    </>
  );
}

export default ButtonChannel;
