let reducer_IO = (IO = {}, action) => {
	switch(action.type) {
		case 'INIT_EVENTS':
			var socket = IO.socket;

			socket.on('connected', (data) => {
				action.actions.setSessionId(IO.socket.id);
			});
			socket.on('canJoin', (data) => {
				action.actions.canJoin(data);
			});
			socket.on('playerCount', (data) => {
				action.actions.updatePlayerCount(data);
			});
			socket.on('gameChange', (data) => {
				switch(data.type) {
					case 'playerJoin':
						action.actions.updateConsole("Join: " + data.data);
						break;
					case 'playerLeave':
						action.actions.updateConsole("Leave: " + data.data);
						break;
					case 'positions':
						action.actions.updatePlayers(data);
						var now = new Date();
						action.actions.updatePing(now.getTime() - data.time)
						break;
					default:
						break;
				}
			});
			socket.on('spawn', (data) => {
				action.actions.updatePosition(data.x, data.y);
				action.actions.updateColor(data.color);
			});
			
			return Object.assign({}, IO, {socket: socket});

		default:
			return IO;
	}
}

export default reducer_IO;