import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface CurrentUserPayload {
  id: string;
  username: string;
}

const getCurrentUser = createParamDecorator(
  (data: keyof CurrentUserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: CurrentUserPayload = request.user;
    return data ? user?.[data] : user;
  },
);

export function CurrentUser(): ParameterDecorator & {
  __type: CurrentUserPayload;
};
export function CurrentUser<K extends keyof CurrentUserPayload>(
  field: K,
): ParameterDecorator & { __type: CurrentUserPayload[K] };
export function CurrentUser(field?: keyof CurrentUserPayload) {
  return getCurrentUser(field);
}
