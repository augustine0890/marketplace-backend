import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponse } from '../response';

export class DataTransformInterceptor<T>
  implements NestInterceptor<T, SuccessResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse> {
    return next.handle().pipe(map(transformData(context)));
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function transformData(context: ExecutionContext) {
  return (response: SuccessResponse) => {
    response['success'] = true;
    return response;
  };
}
