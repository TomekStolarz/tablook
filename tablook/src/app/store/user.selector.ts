import { createFeatureSelector } from '@ngrx/store';
import { UserInfo } from '../interfaces/user-info.interface';

export const selectUser = createFeatureSelector<UserInfo>('user');
