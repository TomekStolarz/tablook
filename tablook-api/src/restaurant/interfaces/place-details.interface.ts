import { Review } from './review.interface';

export interface PlaceDetails {
  user_ratings_total: number;
  rating: number;
  reviews: Review[];
}
