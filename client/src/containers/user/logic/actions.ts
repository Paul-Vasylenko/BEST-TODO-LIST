import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from './action-types';

export const setUser = createAction<actionTypes.TSetUser>(actionTypes.SET_USER);
export const setLoading = createAction<actionTypes.TSetLoading>(
	actionTypes.SET_LOADING,
);
