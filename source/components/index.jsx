import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../redux/store.jsx';
import App from './App.jsx';

let initialState = {
	player: {
		canJoin: false,
		speed: 10
	},
	game: {
		console: [],
		players: []
	},
	IO: {
		socket: io.connect()
	}
}

let store = configureStore(initialState);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);