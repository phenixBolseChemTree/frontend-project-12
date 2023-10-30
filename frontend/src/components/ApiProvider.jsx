import { createContext, useContext } from 'react';

const SocketContext = createContext();

const useApi = () => useContext(SocketContext);

// const actions = {
//   newMessage: (data) => {
//     socket.emit('newMessage', {
//       body: data.validatedText,
//       username: data.localStorage.username,
//       channelId: data.currentChannelId,
//     });
//   },
//   newChannel: (data) => {
//     socket.emit('newChannel', { name: data.name });
//   },
//   removeChannel: (data) => {
//     socket.emit('removeChannel', { id: data.id });
//   },
//   renameChannel: (data) => {
//     socket.emit('renameChannel', { id: data.id, name: data.name });
//   },
// };

export { useApi, SocketContext };
