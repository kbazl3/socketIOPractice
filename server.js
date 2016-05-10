var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http), //initialize a new instance of socket.io by passing the http (the HTTP server) object.
    port = 3050;


app.use(express.static(__dirname + '/public')); // NOTE: tells it to host this static page for us Local through Nodemon.

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function() {
    console.log('listening on ', port);
});
