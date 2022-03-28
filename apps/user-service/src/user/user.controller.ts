import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() req: UserDto) {
    return this.userService.register(req);
  }

  @Post('login')
  login(@Body() req: UserDto) {
    return this.userService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@Body() req: UserDto) {
    return req.username;
  }
}
