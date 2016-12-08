let reducer_player = (player = {}, action) => {
	switch(action.type) {
		case 'CAN_JOIN':
			return Object.assign({}, player, {canJoin: action.state});

		case 'JOIN':
			action.IO.socket.emit('join', {name: action.name});
			return Object.assign({}, player, {name: action.name})

		case 'SET_SESSION_ID':
			return Object.assign({}, player, {id: action.id});

		case 'UPDATE_POSITION':
			return Object.assign({}, player, {x: action.x, y: action.y});

		case 'UPDATE_COLOR':
			return Object.assign({}, player, {color: action.color});

		case 'UPDATE_PING':
			return Object.assign({}, player, {ping: action.time});

		default:
			return player;
	}
}

export default reducer_player;