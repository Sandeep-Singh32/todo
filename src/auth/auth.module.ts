import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './jwt.strategy';

@Module({
  providers: [JwtAuthStrategy],
  exports: [JwtAuthStrategy],
})
export class AuthModule {}
