import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { DataSource } from 'typeorm';
import { RefreshTokenEntity } from '../../entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { Errors } from '../../interfaces/errors';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: LoginDto) {
    const user = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw new HttpException(Errors.USER_NOT_FOUND, 404);
    }
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException(Errors.BAD_CREDENTIAL, 401);
    }

    delete user.password;

    return user;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.dataSource.getRepository(UserEntity).findOneBy({
      email: registerDto.email,
    });

    if (user) {
      throw new ConflictException(Errors.USER_ALREADY_EXIST);
    }

    const hashedPassword = hashSync(registerDto.password, 12);

    const operation = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder()
      .insert()
      .values({ ...registerDto, password: hashedPassword })
      .returning('*')
      .execute();

    const candidate = operation.generatedMaps[0] as UserEntity;

    const tokens = this.generateTokens(candidate);

    await this.dataSource.getRepository(RefreshTokenEntity).save({
      userId: candidate.id,
      value: tokens.refreshToken,
    });

    return tokens;
  }

  public async login(user: UserEntity) {
    const tokens = this.generateTokens(user);

    await this.dataSource.getRepository(RefreshTokenEntity).save({
      userId: user.id,
      value: tokens.refreshToken,
    });

    return tokens;
  }

  private generateTokens(user: UserEntity) {
    const accessToken = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: process.env.REFRESH_EXP_IN },
    );

    return { refreshToken, accessToken };
  }
}
