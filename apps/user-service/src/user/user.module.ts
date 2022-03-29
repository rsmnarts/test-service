import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'common/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
