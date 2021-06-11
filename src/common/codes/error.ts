const ErrorCodes = {
  LocalAuthFailed: 'E1000',
  AuthFailed: 'E1001',
  RefreshAuthFailed: 'E1002',
  InvalidRequest: 'E1003',
  UserNotFound: 'E1004',
  TransactionAlreadyInProgress: 'E1005',
  TransactionAlreadySucceded: 'E1006',
  OrderDoesNotExistWithUser: 'E1007',
  ResetPasswordTokenInvalid: 'E1008',
  CartIsEmpty: 'E1009',
  CartNotFound: 'E1010',
  RazorPayFailure: 'E2000',
  BillingCalculationError: 'E2002',
} as const;

export const errorCodes = {
  ...ErrorCodes,
} as const;

export type ErrorType = keyof typeof errorCodes;
export type ErrorCode = typeof errorCodes[ErrorType];

const errorTypes: Partial<Record<ErrorType, ErrorCode>> = {};

Object.keys(errorCodes).forEach((key: ErrorCode) => {
  errorTypes[errorCodes[key]] = key;
});

export { errorTypes };
