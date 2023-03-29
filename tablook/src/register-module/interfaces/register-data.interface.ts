import { UserType } from '../../app/interfaces/user-type.enum';

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	type: UserType;
	surname?: string;
	phone?: string;
}
