import {applyMiddleware, compose, createStore} from 'redux';
import reducer from './reducers/index.jsx';

let finalCreateStore = compose(
	applyMiddleware()
)(createStore);

let configureStore = (initialState: {player: {}, game: {}}) => {
	return finalCreateStore(reducer, initialState);
}

export default configureStore;