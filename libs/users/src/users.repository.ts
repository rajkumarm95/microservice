import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  /**
   * @constructor UsersRepository DI
   * @param usersRepository
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * @method createUser
   * @param request
   * @returns
   */
  async createUser(request: CreateUserDto) {
    const user = this.usersRepository.create({
      name: request.name,
      email: request.email,
      password: request.password,
    });
    return this.usersRepository.save(user);
  }
  /**
   * @method fetchUserById
   * @param id
   * @returns
   */
  async fetchUserById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * @method fetchUserByEmail
   * @param email
   * @returns
   */
  async fetchUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
