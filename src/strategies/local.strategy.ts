import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../controllers/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }
}
