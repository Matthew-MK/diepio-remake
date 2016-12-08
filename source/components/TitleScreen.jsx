import React from 'react';

class TitleScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: ""
		}
	}

	handleChange(event) {
		this.setState({name: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.actions.join(this.props.IO, this.state.name);
	}

	render() {
		return(
			<div>
				<h1>DIEP.IO</h1>
				<h2>remake</h2>
				<p>Players: {this.props.game.playerCount}</p>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input type="text" placeholder="Username" value={this.state.name} onChange={this.handleChange.bind(this)}/>
				</form>
			</div>
		);
	}
}

export default TitleScreen;