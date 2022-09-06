import { UsersService } from '@app/users';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * @constructor LocalStrategy DI
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }
  /**
   * @method validate (default function)
   * @param email
   * @param password
   * @returns
   */
  async validate(email: string, password: string) {
    return this.usersService.validateUser(email, password);
  }
}
