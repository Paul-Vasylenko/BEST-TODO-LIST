import userReducer from 'containers/user/logic/reducer';
import { combineReducers, Reducer } from 'redux';
import { IRootState } from 'typings/root-state';

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
	user: userReducer,
});

export default rootReducer;
