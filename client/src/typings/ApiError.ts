export interface ApiError extends Error {
	message: string;
	errors: any[];
}
