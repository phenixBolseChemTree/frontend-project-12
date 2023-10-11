import React from 'react';
import { useTranslation } from 'react-i18next';
import ModalMakeChannels from './ModalMakeChannels';
import ButtonChannel from './ButtonChannel';

const Chanells = ({ channels }) => {
  const { t } = useTranslation();
  if (!channels) {
    return null;
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <ModalMakeChannels />
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.length !== 0 && channels.map(({ id, name, removable }) => (
          <li key={id} className="nav-item w-100">
            <ButtonChannel
              removable={removable}
              name={name}
              id={id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chanells;
