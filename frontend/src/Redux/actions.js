// const = (token) => {
//   axios.get('/api/v1/data', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
//     const { channels, currentChannelId } = response.data
//     dispatch(addChannel({ channelId: currentChannelId, channelData: channels }));
//   }
// }