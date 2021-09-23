import { all } from 'redux-saga/effects';
import userSaga from 'containers/user/logic/saga';

export default function* rootSaga() {
	yield all([userSaga()]);
}
