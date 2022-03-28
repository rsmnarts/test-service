import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { DbService } from 'common/db/db.service';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(cfg: ConfigService, private db: DbService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: cfg.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; username: string }) {
    console.log(
      'arts ~ file: jwt.strategy.ts ~ line 18 ~ JwtStrategy ~ validate ~ payload',
      payload,
    );

    const user = await this.db.user.findUnique({
      where: { id: payload.sub },
    });

    delete user.password;
    return user;
  }
}
