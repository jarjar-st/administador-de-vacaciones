import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { permission } from 'process';
import { LoginUserDto } from 'src/user/dto/dto/auth.dto';
import { UserService } from 'src/user/user.service';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    console.log('user RECIENTE QUE SOLICITOOOO:', user);
    const payload = {
      email: dto.email,
      sub: {
        name: user.Persona.Nombre,
        roles: user.Rol.Rol,
        permisos: user.Rol.RolePermisos.map((rp) => rp.Permisos)
        // permisos: user.Permisos
      },
      roles: user.Rol.Rol,
      permisos: user.Rol.RolePermisos.map((rp) => rp.Permisos)
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: process.env.jwtSecretKey
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshToken
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
      }
    };
  }

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);
    console.log('user:', user);
    const ifCompare = await compare(dto.password, user.Contrasena);
    console.log('result:', ifCompare);

    if (user && (await compare(dto.password, user.Contrasena))) {
      const { Contrasena, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.sub
    };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
        secret: process.env.jwtSecretKey
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshToken
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME)
    };
  }
}
