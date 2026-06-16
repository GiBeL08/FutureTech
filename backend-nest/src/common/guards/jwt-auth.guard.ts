import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    
    // КРИТИЧЕСКИ ВАЖНО: Если браузер делает preflight-проверку, разрешаем её без токена
    if (request.method === 'OPTIONS') {
      return true;
    }
    
    // Для всех остальных методов (POST, GET и т.д.) запускаем стандартную проверку JWT
    return super.canActivate(context);
  }
}