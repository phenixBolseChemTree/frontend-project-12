import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ChannelsModal from './Components/ChannelsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../../Redux/chatSlice';
import cn from 'classnames'
const ButtonChannel = ({ socket, id, name, setSelectedChannel, selectedChannel, removable, channels }) => {
  const dispatch = useDispatch();

  const currentChannelIdNew = useSelector(state => state.app.currentChannelId);
  const isSelectedNew = currentChannelIdNew === id
  // const isSelected = selectedChannel === id;
  // console.log('id: ', name, id);
  // console.log('selectedChannel: ', selectedChannel);

  const buttonClasses = cn('w-100 rounded-0 text-start btn border-0', {
    'bg-secondary text-white': isSelectedNew, // Если selectedChannel === id, добавьте классы для серой кнопки и белого текста
  });

  const handleSetChannet = (id) => {
    dispatch(setCurrentChannelId(id));
  }

  return (
    <>
      {!removable && (
        <button
          onClick={() => handleSetChannet(id)}
          type="button"
          className={buttonClasses}>
          <span className="me-1">#</span>{name}
        </button>
      )}
      {removable && (
        <ButtonGroup className="d-flex justify-content-start">
          <Button
            style={{ color: 'black', background: 'white' }}
            className={buttonClasses} // Примените те же классы к кнопке
            onClick={() => handleSetChannet(id)}><span className="me-1">#</span>{name}</Button>
          <DropdownButton title="" style={{ color: 'black', background: 'white' }} as={ButtonGroup} id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1"><ChannelsModal action={'delete'} name={name} id={id} socket={socket} setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel} /></Dropdown.Item>
            <Dropdown.Item eventKey="2"><ChannelsModal action={'rename'} name={name} id={id} socket={socket} channels={channels} /></Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      )}
    </>
  );
}

export default ButtonChannel;
