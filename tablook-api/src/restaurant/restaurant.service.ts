import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { apiKey } from 'api-key';
import { AxiosError } from 'axios';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { PlaceDetails } from './interfaces/place-details.interface';

@Injectable()
export class RestaurantService {
  private googleMapsApi = 'https://maps.googleapis.com/maps/api';
  private apiKey = apiKey;
  private readonly logger = new Logger(RestaurantService.name);

  constructor(private http: HttpService) {}

  private getPlaceId(placeText: string): Observable<string> {
    const params = {
      fields: 'place_id',
      inputtype: 'textquery',
      input: placeText,
      key: this.apiKey,
    };
    if (!placeText) {
      return of('');
    }
    return this.http
      .get<{ candidates: [{ place_id: string }] }>(
        `${this.googleMapsApi}/place/findplacefromtext/json`,
        {
          params: params,
        },
      )
      .pipe(
        map((googleData) => {
          if (!googleData.data.candidates.length) {
            throw new HttpException(
              'Cannot find this place',
              HttpStatus.BAD_REQUEST,
            );
          }
          return googleData.data.candidates[0].place_id;
        }),
        tap(() => this.logger.log('Successfully get place_id')),
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data || 'Cannot get place_id');
          throw new HttpException(
            'Cannot get place_id from google server',
            HttpStatus.BAD_REQUEST,
          );
        }),
      );
  }

  getDetailsFromGoogle(placeText: string): Observable<PlaceDetails> {
    const params = {
      fields: 'reviews,user_ratings_total,rating,place_id',
      key: this.apiKey,
    };
    return this.getPlaceId(placeText || '').pipe(
      switchMap((place_id) => {
        params['place_id'] = place_id;
        if (!place_id) {
          return of({
            reviews: [],
            rating: 0,
            user_ratings_total: 0,
            place_id: '',
          });
        }
        return this.http
          .get<{ result: PlaceDetails }>(
            `${this.googleMapsApi}/place/details/json`,
            {
              params: params,
            },
          )
          .pipe(
            map((googleData) => {
              return {
                reviews: googleData.data.result.reviews,
                rating: googleData.data.result.rating,
                user_ratings_total: googleData.data.result.user_ratings_total,
                place_id: place_id,
              };
            }),
            tap(() => this.logger.log('Succefully get place details')),
            catchError((error: AxiosError) => {
              this.logger.error(
                error.response?.data ||
                  'Cannot get place details. Wrong id provided',
              );
              throw new HttpException(
                'Cannot get place details. Wrong id provided',
                HttpStatus.BAD_REQUEST,
              );
            }),
          );
      }),
    );
  }
}
