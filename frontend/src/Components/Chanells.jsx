import React from "react";
import ModalMakeChannels from "./ModalMakeChannels";
import ButtonChannel from "./ChennelsStuct/buttonChannel/ButtonChannel";

const Chanells = ({ channels, setSelectedChannel, selectedChannel, socket }) => {
  if (channels) {
    return (<>
      <div className="col-4 col-md-3 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <ModalMakeChannels socket={socket} channels={channels} />
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.length !== 0 && channels.map(({ id, name, removable }) => {
            return (
              <li key={id} className="nav-item w-100">
                <ButtonChannel
                  removable={removable}
                  name={name}
                  id={id}
                  socket={socket}
                  selectedChannel={selectedChannel}
                  setSelectedChannel={setSelectedChannel}
                  channels={channels}
                />
              </li>
            )
          })}
        </ul>
      </div >
    </>
    )
  }
}

export default Chanells;