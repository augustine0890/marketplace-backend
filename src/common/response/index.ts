import { ErrorCode, ErrorType, errorTypes } from '../codes/error';
type Data = Record<string, any> | string | number | boolean;

export interface IMeta {
  context: string;
  totalCount: number;
  page: number;
  [key: string]: any;
}

export function CustomError(
  message: string,
  code: ErrorCode,
  context?: string,
  type?: ErrorType,
  data?: any,
) {
  this.message = message;
  this.code = code;
  this.type = type || errorTypes[code] || undefined;
  this.context = context;
  this.data = data;
}

export type DataT =
  | Record<string, Data>[]
  | Record<string, Data>
  | Data[]
  | Data;

interface ISuccessResponse<D> {
  success?: boolean;
  message?: string;
  data?: D;
  meta?: Partial<IMeta>;
  [key: string]: DataT;
}

export type SuccessResponse<D = DataT> = ISuccessResponse<D>;

export class SuccessResponseDTO<T = DataT> implements SuccessResponse<T> {
  [key: string]: DataT;
  success?: boolean;
  message?: string;
  data?: T;
  meta?: Partial<IMeta>;
}
