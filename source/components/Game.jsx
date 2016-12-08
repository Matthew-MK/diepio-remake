import React from 'react';
import Konva from 'konva';

class Game extends React.Component {
	constructor(props) {
		super(props);

		document.onkeydown = this.handleKeyDown.bind(this);
		document.onkeyup = this.handleKeyUp.bind(this);
	}

	handleKeyDown(event) {
		switch(event.keyCode) {
			//left
			case 37:
				var direction = 'XB';
				break;
			//up
			case 38:
				var direction = 'YB';
				break;
			//right
			case 39:
				var direction = 'XF';
				break;
			//down
			case 40:
				var direction = 'YF';
				break;
			default:
				break;
		}
		//this.props.actions.updatePosition(x, y);
		var now = new Date();
		this.props.IO.socket.emit('startMove', {direction: direction, time: now.getTime()});
	}
	
	handleKeyUp(event) {
		switch(event.keyCode) {
			//left
			case 37:
				var direction = 'XB';
				break;
			//up
			case 38:
				var direction = 'YB';
				break;
			//right
			case 39:
				var direction = 'XF';
				break;
			//down
			case 40:
				var direction = 'YF';
				break;
			default:
				
				break;
		}
		//this.props.actions.updatePosition(x, y);
		//this.props.IO.socket.emit('stopMove', direction);
	}

	render() {
		var console_entries = this.props.game.console.map((console_entry) => {
			return <p>{console_entry}</p>;
		});

		var players = this.props.game.players.map((player) => {
			return <div className="player" style={{position: 'absolute', background: player.color, width: '20px', height: '20px', left: player.x, top: player.y}}>{player.name}</div>
		});

		return(
			<div>
				<div id="playground" style={{width: '100%', height: '75%'}}>
					{players}
				</div>
				<p>Ping: {this.props.player.ping}ms</p>
				<div id="console" style={{width: '100%', height: '25%'}}>{console_entries}</div>
			</div>
		);
	}
}

export default Game;