import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ChannelsModal from './ChannelsModal';
import cn from 'classnames'
const ButtonChannel = ({ socket, id, name, setSelectedChannel, selectedChannel, removable, channels }) => {
  const isSelected = selectedChannel === id;
  // console.log('id: ', name, id);
  // console.log('selectedChannel: ', selectedChannel);

  const buttonClasses = cn('w-100 rounded-0 text-start btn', {
    'bg-secondary text-white': isSelected, // Если selectedChannel === id, добавьте классы для серой кнопки и белого текста
  });

  return (
    <>
      {!removable && (
        <button
          onClick={() => setSelectedChannel(id)}
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
            onClick={() => setSelectedChannel(id)}><span className="me-1">#</span>{name}</Button>
          <DropdownButton title="" style={{ color: 'black', background: 'white' }} as={ButtonGroup} id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1"><ChannelsModal action={'delete'} name={name} id={id} socket={socket} /></Dropdown.Item>
            <Dropdown.Item eventKey="2"><ChannelsModal action={'rename'} name={name} id={id} socket={socket} channels={channels} /></Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      )}
    </>
  );
}

export default ButtonChannel;
