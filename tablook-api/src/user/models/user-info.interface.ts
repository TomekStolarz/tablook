import { UserDetails } from './user-details.interface';
import { UserType } from './user-type.enum';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  type: UserType;
  surname?: string;
  phone?: string;
  details?: UserDetails;
}
