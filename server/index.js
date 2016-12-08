var path = require('path');
var logger = require('express-logger');
var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8337;

server.listen(port);

app.use(logger({path: 'server/server.log'}));
app.use(express.static(path.join(__dirname, '../distribution')));

var players = {};
var sockets = [];

var speed = 5;

io.on('connection', function(socket) {
	socket.emit('connected');
	io.sockets.emit('playerCount', Object.keys(players).length);

	socket.on('disconnect', function() {
		try {
			var room = socket.room;

			io.to(room).emit('gameChange', {type: 'playerLeave', data: players[socket.id].name});

			socket.leave(room);

			console.log("Leave:", players[socket.id].name);

			delete players[socket.id];

			io.sockets.in(room).emit('gameChange', {type: 'positions', data: Object.keys(io.sockets.adapter.rooms[room]['sockets']).map(function(key) {
				return players[key];
			})});
		}
		catch(error) {
			console.log("Player has not joined any room");
		}
		io.sockets.emit('playerCount', Object.keys(players).length);
	});

	socket.on('join', function(data) {
		if('name' in data && data.name != "") {
			players[socket.id] = data;

			socket.room = 'room';
			socket.join('room');

			sockets.push(socket);

			socket.emit('canJoin', true);

			var x = Math.random() * 100;
			var y = Math.random() * 100;
			players[socket.id]['x'] = x;
			players[socket.id]['y'] = y;

			players[socket.id]['directions'] = [];

			players[socket.id]['directions']['XB'] = false;
			players[socket.id]['directions']['YB'] = false;
			players[socket.id]['directions']['XF'] = false;
			players[socket.id]['directions']['YF'] = false;

			var color = randomColor();
			players[socket.id]['color'] = color;

			socket.emit('spawn', {x: x, y: y, color: color});

			io.sockets.in(socket.room).emit('gameChange', {type: 'playerJoin', data: data.name});
			io.sockets.in(socket.room).emit('gameChange', {type: 'positions', data: Object.keys(io.sockets.adapter.rooms[socket.room]['sockets']).map(function(key) {
				return players[key];
			})});

			console.log("Join:", data.name);
		}
		else {
			console.log("error: no name");
			socket.emit('canJoin', false);
		}
		io.sockets.emit('playerCount', Object.keys(players).length);
	});

	socket.on('startMove', function(data) {
		switch(data.direction) {
			case 'XB':
				players[socket.id]['x'] = players[socket.id]['x'] - speed;
				players[socket.id]['y'] = players[socket.id]['y'];
				break;
			case 'YB':
				players[socket.id]['x'] = players[socket.id]['x'];
				players[socket.id]['y'] = players[socket.id]['y'] - speed;
				break;
			case 'XF':
				players[socket.id]['x'] = players[socket.id]['x'] + speed;
				players[socket.id]['y'] = players[socket.id]['y'];
				break;
			case 'YF':
				players[socket.id]['x'] = players[socket.id]['x'];
				players[socket.id]['y'] = players[socket.id]['y'] + speed;
				break;
			default:
				break;
		}
		io.sockets.in(socket.room).emit('gameChange', {type: 'positions', data: Object.keys(io.sockets.adapter.rooms[socket.room]['sockets']).map(function(key) {
			return players[key];
		}), time: data.time});
	});

	socket.on('stopMove', function(data) {
	});
});

function randomColor() {
	var d = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	var hex = '#';
	for(var i = 0; i < 6; i++) {
		hex += d[Math.floor(Math.random() * (d.length - 1))];
	}
	return hex;
}