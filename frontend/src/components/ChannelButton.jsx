import {
  Button, Dropdown, ButtonGroup, DropdownButton,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { openModal, setCurrentChannelId } from '../slice/index';

const ButtonChannel = ({ id, name, removable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.chat.currentChannelId);
  const isSelected = currentChannelId === id;
  const btnClassesPart1 = cn('w-100 rounded-0 text-start border-0', {
    'bg-secondary text-white': isSelected,
  });

  const handleSetChannet = (_id) => {
    dispatch(setCurrentChannelId(_id));
  };

  return (
    <>
      {!removable && (
        <Button
          variant="light"
          onClick={() => handleSetChannet(id)}
          type="button"
          className={btnClassesPart1}
        >
          <span className="me-1">#</span>
          {name}
        </Button>
      )}
      {removable && (
        <ButtonGroup className="d-flex justify-content-start">
          <Button
            style={{ color: 'black', background: '#f8f9fa' }}
            className={btnClassesPart1}
            onClick={() => handleSetChannet(id)}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
          <DropdownButton
            variant={isSelected ? 'secondary' : ''}
            title={<span><span className="visually-hidden">{t('chat.controlChannel')}</span></span>}
            style={{ color: 'black', background: '#f8f9fa' }}
            as={ButtonGroup}
            id="bg-nested-dropdown"
          >
            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'removeChannel', id }))} eventKey="1">{t('dropdownBar.delete')}</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(openModal({ type: 'renameChannel', id }))} eventKey="2">{t('dropdownBar.rename')}</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      )}
    </>
  );
};

export default ButtonChannel;
