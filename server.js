var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.get('/', function(req, res){
  res.sendFile(__dirname + '\\index.html');
});


io.on('connection', function(socket){
	socket.on('connected',function(msg){
		socket.broadcast.emit('connected', msg+" has joined the chat");
	});

	socket.on('disconnect',function(msg){
		socket.broadcast.emit('connected', "A user has left the chat");
	});

	socket.on('message', function(msg){
		io.emit('message', msg);
	});
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
    