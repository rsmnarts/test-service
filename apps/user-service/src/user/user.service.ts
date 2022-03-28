import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { DbService } from 'common/db/db.service';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    private db: DbService,
    private jwt: JwtService,
    private cfg: ConfigService,
  ) {}

  async register(req: UserDto) {
    const passwordHashed = await argon.hash(req.password);
    try {
      const user = await this.db.user.create({
        data: {
          username: req.username,
          password: passwordHashed,
        },
      });

      delete user.password;
      return {
        access_token: await this.signToken(user.id, user.username),
      };
    } catch (err) {
      if (err.code === 'P2002')
        throw new ForbiddenException('Username already exists');

      throw err;
    }
  }

  async login(req: UserDto) {
    const user = await this.db.user.findUnique({
      where: { username: req.username },
    });

    if (!user) throw new ForbiddenException('Invalid username or password');

    const isValidPass = await argon.verify(user.password, req.password);
    if (!isValidPass)
      throw new ForbiddenException('Invalid username or password');

    delete user.password;
    return user;
  }

  async signToken(userId: number, username: string): Promise<string> {
    const payload = { sub: userId, username };
    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.cfg.get('JWT_SECRET'),
    });
  }
}
