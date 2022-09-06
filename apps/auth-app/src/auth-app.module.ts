import { AuthModule } from '@app/auth';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
})
export class AuthAppModule {}
