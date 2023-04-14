import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable()
export class ResponseHeadersInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const req = context.switchToHttp().getRequest();
        req.res.setHeader(
          'Access-Control-Allow-Origin',
          'http://localhost:4200',
        );
        return data;
      }),
      catchError((error) => {
        const req = context.switchToHttp().getRequest();
        req.res.setHeader(
          'Access-Control-Allow-Origin',
          'http://localhost:4200',
        );
        return throwError(
          () =>
            new HttpException(
              {
                message:
                  error?.response?.message ||
                  error?.detail ||
                  'Something went wrong',
                timestamp: new Date().toISOString(),
                route: req.path,
                method: req.method,
              },
              error?.response.statusCode || 500,
            ),
        );
      }),
    );
  }
}
