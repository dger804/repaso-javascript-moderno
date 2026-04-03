import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Si ya viene con meta (paginación)
        if (data?.data && data?.total !== undefined) {
          const { data: items, total, page, lastPage } = data;

          return {
            data: items,
            meta: {
              total,
              page,
              lastPage,
            },
          };
        }

        // Respuesta normal
        return {
          data,
        };
      }),
    );
  }
}