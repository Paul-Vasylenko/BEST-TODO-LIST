import axios, { AxiosRequestConfig } from 'axios';

export const API_URL = 'http://localhost:4000/api';

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
	if (!config || !config.headers) {
		return;
	}
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
	return config;
});

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		console.log(error.response.data);

		const originalRequest = error.config;
		if (
			error.response.data.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			try {
				const response = await axios.get(`${API_URL}/refresh`, {
					withCredentials: true,
				});
				localStorage.setItem('token', response.data.accessToken);
				return $api.request(originalRequest);
			} catch (e) {
				console.log(e);
			}
		}

		throw Error(
			error.response.data.errors.length === 0
				? error.response.data.message
				: error.response.data.message +
						':' +
						error.response.data.errors[0].param,
		);
	},
);

export default $api;
