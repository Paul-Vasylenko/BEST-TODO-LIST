import axios from 'axios';
import { API_URL } from 'helpers/http';
import { AuthService } from 'services/auth-service';
import { AppDispatch } from 'store';
import { AuthSlice, IAuthState } from 'store/reducers';

export const registration =
	(email: string, password: string, name: string) =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthSlice.actions.setIsLoading(true));
			const response = await AuthService.registration(
				email,
				password,
				name,
			);
			console.log(response);
			localStorage.setItem('token', response.data.accessToken);
			dispatch(
				AuthSlice.actions.successLogin({
					user: response.data.user,
				} as IAuthState),
			);
		} catch (e: any) {
			console.log(e);
			dispatch(
				AuthSlice.actions.failLogin({
					errors: [e.message],
				} as IAuthState),
			);
		} finally {
			dispatch(AuthSlice.actions.setIsLoading(false));
		}
	};

export const login =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthSlice.actions.setIsLoading(true));
			const response = await AuthService.login(email, password);
			localStorage.setItem('token', response.data.accessToken);
			dispatch(
				AuthSlice.actions.successLogin({
					user: response.data.user,
				} as IAuthState),
			);
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(AuthSlice.actions.setIsLoading(false));
		}
	};

export const logout = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(AuthSlice.actions.setIsLoading(true));
		await AuthService.logout();
		localStorage.removeItem('token');
		dispatch(AuthSlice.actions.successLogout());
	} catch (e) {
		console.log(e);
	} finally {
		dispatch(AuthSlice.actions.setIsLoading(false));
	}
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(AuthSlice.actions.setIsLoading(true));

		const response = await axios.get(`${API_URL}/auth/refresh`, {
			withCredentials: true,
		});

		localStorage.setItem('token', response.data.accessToken);
		dispatch(
			AuthSlice.actions.successLogin({
				user: response.data.user,
			} as IAuthState),
		);
	} catch (e) {
		console.log(e);
	} finally {
		dispatch(AuthSlice.actions.setIsLoading(false));
	}
};
