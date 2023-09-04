import React, { useEffect } from "react";
import io from 'socket.io-client';

const Chanells = ({ channels, socket }) => {
  const handleClick = (id) => {
    console.log('!!!id', id);
  }
  if (channels) {
    return (
      <div className="col-md-3">
        <div className="channel-list">
          <h3>Каналы</h3>
          <ul className="list-group">
            {channels.length !== 0 && channels.map(({ id, name }) => (
              <li key={id} className="list-group-item border border-dark"><button onClick={() => handleClick(id)} type="button" class="w-100 rounded-0 text-start btn btn-secondary"><span class="me-1">#</span>{name}</button></li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Chanells;