import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ChannelsModal from './ChannelsModal';
const ButtonChannel = ({ socket, id, name, setSelectedChannel, selectedChannel, removable }) => {
  console.log('selectedChannel === id', selectedChannel === id, id, selectedChannel);
  return (

    <>
      {!removable && (
        <button
          onClick={() => setSelectedChannel(id)}
          type="button"
          className="w-100 rounded-0 text-start btn">
          <span className="me-1">#</span>{name}
        </button>
      )}
      {removable && (
        <ButtonGroup className="d-flex justify-content-start">
          <Button
            style={{ color: 'black', background: 'white' }}
            className="w-100 rounded-0 text-start text-truncate btn"
            onClick={() => setSelectedChannel(id)}><span className="me-1">#</span>{name}</Button>
          <DropdownButton style={{ color: 'black', background: 'white' }} as={ButtonGroup} id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1"><ChannelsModal action={'delete'} name={name} id={id} socket={socket} /></Dropdown.Item>
            <Dropdown.Item eventKey="2"><ChannelsModal action={'rename'} name={name} id={id} socket={socket} /></Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      )
      }
    </>
  );
}

export default ButtonChannel;