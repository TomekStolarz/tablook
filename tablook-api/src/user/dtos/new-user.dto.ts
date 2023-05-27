import { UserDetails } from '../models/user-details.interface';
import { UserType } from '../models/user-type.enum';

export class NewUserDTO {
  name: string;
  email: string;
  password: string;
  type: UserType;
  surname?: string;
  phone?: string;
  favourites?: string[];
  details?: UserDetails;
}
