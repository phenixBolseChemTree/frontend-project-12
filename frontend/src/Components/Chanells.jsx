import React from "react";
import Modal from "./Modal";

const Chanells = ({ channels, setSelectedChannel }) => {
  if (channels) {
    return (
      <div className="col-md-3">
        <div className="channel-list">
          <h3>Каналы</h3>
          <Modal />
          <ul className="list-group">
            {channels.length !== 0 && channels.map(({ id, name }) => (
              <li key={id} className="list-group-item border border-dark">
                <button
                  onClick={() => setSelectedChannel(id)}
                  type="button"
                  className="w-100 rounded-0 text-start btn btn-secondary">
                  <span className="me-1">#</span>{name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Chanells;