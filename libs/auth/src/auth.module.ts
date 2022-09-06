import { RmqModule } from './../../common/src/rmq/rmq.module';
import { UsersModule } from '@app/users';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as cookieParser from 'cookie-parser';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [
    UsersModule,
    RmqModule.register({ name: 'auth' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'xlOj2c2U?x(`pcT:I]}$gt3F;A()ZZ&3kiL,o~t',
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
})
export class AuthModule implements NestModule {
  /**
   * @method configure (default method)
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    try {
      consumer.apply(cookieParser()).forRoutes('*');
    } catch (error) {}
  }
}
