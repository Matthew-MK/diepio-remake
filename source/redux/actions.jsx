let actions = {
	/* IO */
	initEvents: (actions) => {
		return {
			type: 'INIT_EVENTS',
			actions: actions
		}
	},

	/* Player */
	canJoin: (state) => {
		return {
			type: 'CAN_JOIN',
			state: state
		}
	},
	join: (IO, name) => {
		return {
			type: 'JOIN',
			IO: IO,
			name: name
		}
	},
	setSessionId: (id) => {
		return {
			type: 'SET_SESSION_ID',
			id: id
		}
	},
	updatePosition: (x, y) => {
		return {
			type: 'UPDATE_POSITION',
			x: x,
			y: y
		}
	},
	updateColor: (color) => {
		return {
			type: 'UPDATE_COLOR',
			color: color
		}
	},
	updatePing: (time) => {
		return {
			type: 'UPDATE_PING',
			time: time
		}
	},

	/* Game */
	updatePlayerCount: (count) => {
		return {
			type: 'UPDATE_PLAYER_COUNT',
			count: count
		}
	},
	updatePlayers: (data) => {
		return {
			type: 'UPDATE_PLAYERS',
			data: data
		}
	},
	updateConsole: (data) => {
		return {
			type: 'UPDATE_CONSOLE',
			data: data
		}
	}
}

export default actions;