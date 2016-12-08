import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import actions from '../redux/actions.jsx';
import TitleScreen from './TitleScreen.jsx';
import Game from './Game.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.props.actions.initEvents(props.actions);
	}

	render() {
		return (this.props.player.canJoin == true ? <Game game={this.props.game} player={this.props.player} IO={this.props.IO} actions={this.props.actions}/> : <TitleScreen actions={this.props.actions} IO={this.props.IO} game={this.props.game}/>);
	}
}

function mapStateToProps(state) {
	return state;
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);