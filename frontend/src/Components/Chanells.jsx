import React from "react";
import ModalMakeChannels from "./ModalMakeChannels";
// import OptionsModal from "./componentsUtil/OptionsModal";
import Options from "./componentsUtil/Options";

const Chanells = ({ channels, setSelectedChannel, socket }) => {
  if (channels) {
    return (<>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <ModalMakeChannels socket={socket} chanells={channels} />
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.length !== 0 && channels.map(({ id, name, removable }) => {
            if (removable) {
              return (<li key={id} className="nav-item w-100">
                <button
                  onClick={() => setSelectedChannel(id)}
                  type="button"
                  role="group"
                  className="d-flex dropdown btn-group">
                  <span className="me-1">#</span>{name}
                </button>
                <Options socket={socket} id={id} name={name} />
              </li>
              )
            } else {
              return (<li key={id} className="nav-item w-100">
                <button
                  onClick={() => setSelectedChannel(id)}
                  type="button"
                  className="w-100 rounded-0 text-start btn">
                  <span className="me-1">#</span>{name}
                </button>
              </li>
              )
            }
          }
          )}
        </ul>
      </div>
    </>
    )
  }
}

export default Chanells;