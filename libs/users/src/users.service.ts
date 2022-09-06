import { CreateUserDto } from './dto/create-user.dto';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  /**
   * @constructor UsersService DI
   * @param usersRepository
   */
  constructor(private usersRepository: UsersRepository) {}

  /**
   * @method createUser
   * @param request
   * @returns
   */
  async createUser(request: CreateUserDto) {
    await this.validateCreateUserRequest(request);
    return this.usersRepository.createUser({
      name: request.name,
      email: request.email,
      password: request.password,
    });
  }

  /**
   * @method validateCreateUserRequest
   * @param request
   */
  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
    try {
      user = await this.usersRepository.fetchUserByEmail(request.email);
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  /**
   * @method getUser
   * @param id
   * @returns
   */
  getUser(id: string) {
    return this.usersRepository.fetchUserById(id);
  }

  /**
   * @method validateUser
   * @param email
   * @param password
   * @returns
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.fetchUserByEmail(email);
    if (password !== user.password) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }
}
