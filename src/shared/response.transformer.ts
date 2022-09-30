import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SimpleResponse<T> {
  data: T;
}

@Injectable()
export class ResponseTransformer<T>
  implements NestInterceptor<T, SimpleResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<SimpleResponse<T>> {
    return next.handle().pipe(
      map(response => {
        return { data: response };
      })
    );
  }
}
