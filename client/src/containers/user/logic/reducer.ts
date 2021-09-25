import { createReducer } from '@reduxjs/toolkit';
import { initialState, IUserDataState } from './state';
import * as actionTypes from './action-types';

const userReducer = createReducer<IUserDataState>(initialState, {
	[actionTypes.SET_USER](
		state,
		{ payload }: { payload: actionTypes.TSetUser },
	) {
		console.log(payload);
		return {
			...state,
			userInfo: payload,
		};
	},
	[actionTypes.SET_LOADING](
		state,
		{ payload }: { payload: actionTypes.TSetLoading },
	) {
		return {
			...state,
			userData: payload.userData,
		};
	},
});

export default userReducer;
