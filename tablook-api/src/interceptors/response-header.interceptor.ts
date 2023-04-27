import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseHeadersInterceptor implements NestInterceptor {
  private logger = new Logger(ResponseHeadersInterceptor.name);

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
    );
  }
}
