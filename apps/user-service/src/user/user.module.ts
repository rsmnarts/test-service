import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbService } from 'common/db/db.service';
import { JwtStrategy } from './strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [JwtModule.register({}), DbService],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
