export class ApiError extends Error {
	public status: number;
	public message: string;
	public errors: any[];
	constructor(status: number, message: string, errors: any[] = []) {
		super(message);
		this.status = status;
		this.message = message;
		this.errors = errors;
	}

	static badRequest(message: string, errors: any[] = []) {
		return new ApiError(404, message, errors);
	}

	static forbidden(message: string, errors: any[] = []) {
		return new ApiError(403, message, errors);
	}

	static internal(message: string, errors: any[] = []) {
		return new ApiError(500, message, errors);
	}

	static Unathorized() {
		return new ApiError(401, 'User is not authorized');
	}
}
