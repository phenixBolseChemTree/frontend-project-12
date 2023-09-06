import React from "react";
import CustomModal from "./ModalMakeChannels";

const Chanells = ({ channels, setSelectedChannel, socket }) => {
const handleClickDelete = (id) => {
  console.log('удалено!!!');
  socket.emit('removeChannel', { id });
}
const handleClickedit = () => {
  console.log('будущее изменение');
}

  if (channels) {
    return (<>
      <div className="col-md-3">
        <div className="channel-list">
          <h3>Каналы</h3>
          <CustomModal socket={socket} chanells={channels} />
          <ul className="list-group">
            {channels.length !== 0 && channels.map(({ id, name, removable }) => {
              if (removable) {
                return (<li key={id} className="list-group-item border border-dark">
                  <button
                    onClick={() => setSelectedChannel(id)}
                    type="button"
                    className="w-100 rounded-0 text-start btn btn-secondary">
                    <span className="me-1">#</span>{name}
                  </button>
                  <button onClick={() => handleClickDelete(id)}>
                    Удалить
                  </button>
                  <button onClick={() => handleClickedit(id)}>
                    Переименовать
                  </button>
                </li>
                )
              } else {
                return (<li key={id} className="list-group-item border border-dark">
                  <button
                    onClick={() => setSelectedChannel(id)}
                    type="button"
                    className="w-100 rounded-0 text-start btn btn-secondary">
                    <span className="me-1">#</span>{name}
                  </button>
                </li>
                )
              }
            }
            )}
          </ul>
        </div>
      </div>
    </>
    )
  }
}

export default Chanells;