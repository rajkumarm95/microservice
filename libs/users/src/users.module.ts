import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CommonModule } from '@app/common';
import { RmqModule } from './../../common/src/rmq/rmq.module';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { AuthModule } from '@app/auth';
@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [
    forwardRef(() => CommonModule),
    TypeOrmModule.forFeature([User]),
    RmqModule.register({ name: 'auth' }),
  ],
})
export class UsersModule {}
