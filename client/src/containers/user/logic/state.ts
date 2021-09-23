import { IUserState } from 'typings/root-state';

export enum UserData {
	LOADING = 'loading',
	LOADED = 'loaded',
}

export interface IUserDataState {
	userInfo: IUserState | null;
	userData: UserData;
}

export const initialState: IUserDataState = {
	userInfo: null,
	userData: UserData.LOADING,
};
