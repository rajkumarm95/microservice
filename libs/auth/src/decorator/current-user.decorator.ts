import { User } from '@app/users';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @method getCurrentUserByContext
 * @param context
 * @returns
 */
export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

/**
 * @method CurrentUser
 * @desc used to extract user information
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
