import { all, takeEvery } from '@redux-saga/core/effects';
import { put } from 'redux-saga/effects';
import * as actionTypes from './action-types';
import * as actions from './actions';

function* userWorker(action: ReturnType<typeof actions.setLoading>) {
	yield setInterval(() => {
		put(actions.setLoading({ userData: action.payload.userData }));
	}, 3000);
}

export function* userWatcher() {
	yield takeEvery(actionTypes.SET_LOADING, userWorker);
}

export default function* userSaga() {
	yield all([userWatcher()]);
}
