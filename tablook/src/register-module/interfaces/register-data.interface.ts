import { UserType } from '../../app/interfaces/user-type.enum';
import { UserDetails } from './user-details.interface';

export interface RegisterData {
	name: string;
	email: string;
	password: string;
	type: UserType;
	surname?: string;
	phone?: string;
	details: UserDetails;
}
