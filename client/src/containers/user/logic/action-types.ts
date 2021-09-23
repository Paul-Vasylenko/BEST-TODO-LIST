import { UserData } from './state';

export const SET_USER = 'USER:SET_USER';
export const SET_LOADING = 'USER:SET_LOADING';

export type TSetUser = {
	userInfo: {
		name: string;
	};
};

export type TSetLoading = {
	userData: UserData;
};
