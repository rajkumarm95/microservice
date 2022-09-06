import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from './database/database.module';
import { RmqModule } from './rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    RmqModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
