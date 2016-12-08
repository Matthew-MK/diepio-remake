import {combineReducers} from 'redux';
import reducer_player from './reducer_player.jsx';
import reducer_game from './reducer_game.jsx';
import reducer_IO from './reducer_IO.jsx';

const reducer = combineReducers({
	player: reducer_player,
	game: reducer_game,
	IO: reducer_IO
});

export default reducer;