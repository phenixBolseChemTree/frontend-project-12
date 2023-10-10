// // socket.emit('newMessage', {
// //   body: validatedText,
// //   username: localStorage.username,
// //   channelId: currentChannelId,
// // });

// // socket.emit('newChannel', { name: values.channelName });

// // socket.emit('removeChannel', { id });

// // socket.emit('renameChannel', { id, name: value });

// const editState = (action, data) => {
//   switch (action) {
//     case 'newMessage':
//       console.log('newMessage');
//       socket.emit('newMessage', {
//         body: validatedText,
//         username: localStorage.username,
//         channelId: currentChannelId,
//       });
//       break;
//     case 'newChannel':
//       socket.emit('newChannel', { name: values.channelName });
//       console.log('newChannel');
//       break;
//     case 'removeChannel':
//       socket.emit('removeChannel', { id });
//       console.log('removeChannel');
//       break;
//     case 'renameChannel':
//       socket.emit('renameChannel', { id, name: value });
//       console.log('renameChannel');
//       break;
//     default:
//   }
// };
