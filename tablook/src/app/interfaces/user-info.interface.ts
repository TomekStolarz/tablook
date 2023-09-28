import { UserType } from 'src/app/interfaces/user-type.enum';
import { UserDetails } from 'src/register-module/interfaces/user-details.interface';

export interface UserInfo {
	id: string;
	name: string;
	email: string;
	type: UserType;
	surname: string;
	phone: string;
	details?: UserDetails;
}
