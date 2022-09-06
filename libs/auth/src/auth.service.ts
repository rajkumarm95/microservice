import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/users';
import { Response } from 'express';

/**
 * @interface TokenPayload
 */
export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  /**
   * @constructor AuthService DI
   * @param jwtService
   * @param authClient
   */
  constructor(
    private readonly jwtService: JwtService,
    @Inject('AUTH') private authClient: ClientProxy,
  ) {}

  /**
   * @method login
   * @param user
   * @param response
   */
  async login(user: User, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 3600); // expire time for JWT token

    const token = this.jwtService.sign(tokenPayload, {
      // signing JWT
      secret: 'xlOj2c2U?x(`pcT:I]}$gt3F;A()ZZ&3kiL,o~t',
    });

    response.cookie('Authentication', token, {
      // saving JWT in a cookie with name Authentication
      httpOnly: true,
      expires,
    });
  }

  /**
   * @method test
   * @returns
   */
  test() {
    this.authClient.emit('test_route', 'working');
    return 'ok';
  }
}
