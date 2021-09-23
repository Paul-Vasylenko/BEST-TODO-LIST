import { IUserDataState } from 'containers/user/logic/state';

export interface IUserState {
	userInfo: {
		name: string;
	};
}

export interface IRootState {
	user: IUserDataState;
}
