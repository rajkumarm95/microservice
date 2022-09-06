import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@app/users';
import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { CurrentUser } from './decorator/current-user.decorator';
import { JwtAuthGuard } from './guards/custom/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  /**
   * @constructor AuthController DI
   * @param authService
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * @method login
   * @param user
   * @param response
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    //passthrough is a stream any kind of end-to-end information exchange in an efficient way.
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  /**
   * @method validateUser
   * @param user
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user: User) {
    return user;
  }

  /**
   * @method microserviceTwoWayCommunication
   */
  @Get()
  async microserviceTwoWayCommunication() {
    return this.authService.microserviceTwoWayCommunication();
  }
}
