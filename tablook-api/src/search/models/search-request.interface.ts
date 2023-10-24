import { Sorting } from './sorting.type';

export interface SearchRequest {
  date: string;
  size: number;
  location?: string;
  arrival?: string;
  query?: string;
  leave?: string;
  rating?: number;
  sortBy?: Sorting;
  userId?: string;
}
