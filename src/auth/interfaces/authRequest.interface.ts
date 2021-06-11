export interface UserAuthPayload {
  id: number;
  email: string;
}

export type AuthenticatedRequest<T = any, U = UserAuthPayload> = T & {
  user: U;
};
