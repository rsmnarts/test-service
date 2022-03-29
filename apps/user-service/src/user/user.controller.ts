import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'common/jwt';
import { GetUser } from './decorator';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() req: UserDto) {
    return this.userService.register(req);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() req: UserDto) {
    return this.userService.login(req);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() req: User) {
    return req;
  }
}
