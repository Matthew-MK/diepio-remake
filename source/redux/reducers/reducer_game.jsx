let reducer_game = (game = {}, action) => {
	switch(action.type) {
		case 'UPDATE_PLAYER_COUNT':
			return Object.assign({}, game, {playerCount: action.count});

		case 'UPDATE_PLAYERS':
			return Object.assign({}, game, {players: action.data.data});

		case 'UPDATE_CONSOLE':
			var console_new = game.console;
			console_new.push(action.data);
			return Object.assign({}, game, {console: console_new});

		default:
			return game;
	}
}

export default reducer_game;