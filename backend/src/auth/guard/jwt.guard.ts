import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('rolesqweqwe:', roles);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No se ha dado un token de autorización');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtSecretKey
      });
      request['user'] = payload;
      console.log('payload:', payload);

      if (roles && roles.length > 0) {
        console.log('Si entra');
        console.log('roles:', roles);
        if (!roles.includes(payload.sub.roles)) {
          console.log('algo', payload.sub.roles);
          throw new ForbiddenException(
            'No tienes permiso para acceder a este recurso'
          );
        }
      }
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
