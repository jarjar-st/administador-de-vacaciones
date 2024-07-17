import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
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
    const payload = {
      email: dto.email,
      sub: {
        name: user.Persona.Nombre
      }
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
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
        expiresIn: '20s',
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
