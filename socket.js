var socket = io('http://localhost:8090');

socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
