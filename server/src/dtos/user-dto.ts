export default class UserDto {
	email;
	id;
	isActivated;
	name;
	activationLink;
	constructor({
		email,
		id,
		isActivated,
		name,
		activationLink,
	}: {
		email: string;
		id: string;
		isActivated: boolean;
		name: string;
		activationLink: string;
	}) {
		this.email = email;
		this.id = id;
		this.isActivated = isActivated;
		this.name = name;
		this.activationLink = activationLink;
	}
}
