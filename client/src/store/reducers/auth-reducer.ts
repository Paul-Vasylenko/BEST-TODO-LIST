import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'typings/IUser';

export interface IAuthState {
	isAuth: boolean;
	isLoading: boolean;
	user: IUser;
	errors: any[];
}

const initialState: IAuthState = {
	isAuth: false,
	isLoading: false,
	user: {} as IUser,
	errors: [],
};

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		successLogin: (state, action: PayloadAction<IAuthState>) => {
			state.isAuth = true;
			state.user.email = action.payload.user.email;
			state.user.id = action.payload.user.id;
			state.user.isActivated = action.payload.user.isActivated;
			state.user.name = action.payload.user.name;
			state.errors = [];
		},
		successLogout: (state) => {
			state.isAuth = false;
			state.user = {} as IUser;
		},
		failLogin: (state, action: PayloadAction<IAuthState>) => {
			state.isAuth = false;
			state.errors = action.payload.errors;
			state.user = {} as IUser;
		},
	},
});

export default AuthSlice.reducer;
