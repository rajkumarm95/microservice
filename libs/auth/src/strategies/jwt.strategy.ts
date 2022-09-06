import { UsersService } from '@app/users';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * @constructor JwtStrategy DI
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.Authentication;
        },
      ]),
      secretOrKey: 'xlOj2c2U?x(`pcT:I]}$gt3F;A()ZZ&3kiL,o~t',
    });
  }

  /**
   * @method validate (default function)
   * @param param0
   * @returns
   */
  async validate({ userId }: TokenPayload) {
    try {
      return await this.usersService.getUser(userId);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
