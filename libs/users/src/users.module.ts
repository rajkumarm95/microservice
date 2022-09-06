import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CommonModule } from '@app/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [forwardRef(() => CommonModule), TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
