var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080, function() {
  console.log('Server running at http://localhost:8080');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  console.log('Someone has connect with Sockets');

  var message = {
    author: 'Socket.IO Server',
    text: 'Welcome'
  };

  // Send welcome message to everyone who is listening
  io.sockets.emit('message', message);

  socket.on('new-message', function(newMessage) {

    console.log(newMessage);

    // Broadcast the message
    io.sockets.emit('message',newMessage);
  });
});
