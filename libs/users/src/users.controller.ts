import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '@app/auth';

@Controller('users')
export class UsersController {
  /**
   * @constructor UsersController DI
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * @method createUser
   * @param request
   * @returns
   */
  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.usersService.createUser(request);
  }

  /**
   * @method test
   */
  @EventPattern('test_route')
  async test() {
    console.log('working ...............');
  }
}
