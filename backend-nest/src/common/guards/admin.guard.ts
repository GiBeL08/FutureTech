import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../../config/constants';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any
  ): any {
    if (err || !user) {
      throw new ForbiddenException('Forbidden');
    }
    const authUser = user as AuthUser;
    if (authUser.role !== 'admin') {
      throw new ForbiddenException('Forbidden');
    }
    return authUser;
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string | undefined;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ForbiddenException('Forbidden');
    }
    return super.canActivate(context);
  }
}
