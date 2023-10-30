const apiActions = {
  newMessage: (data) => {
    data.socket.emit('newMessage', { body: data.body, username: data.username, channelId: data.channelId });
  },
  newChannel: (data) => {
    data.socket.emit('newChannel', { name: data.name });
  },
  removeChannel: (data) => {
    data.socket.emit('removeChannel', { id: data.id });
  },
  renameChannel: (data) => {
    data.socket.emit('renameChannel', { id: data.id, name: data.name });
  },
};

export default apiActions;
