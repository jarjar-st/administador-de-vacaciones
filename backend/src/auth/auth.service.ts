import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    const payload = {
      email: user.email,
      sub: {
        name: user.name
      }
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshToken
        })
      }
    };
  }
  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user && (await compare(dto.password, user.password))) {
      const { password, ...result } = user;
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
        expiresIn: '1h',
        secret: process.env.jwtSecretKey
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshToken
      })
    };
  }
}
