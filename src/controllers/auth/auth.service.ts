import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../../entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { Errors } from '../../interfaces/errors';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshRepository: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: LoginDto) {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      return new HttpException(Errors.USER_NOT_FOUND, 404);
    }
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new HttpException(Errors.BAD_CREDENTIAL, 401);
    }

    delete user.password;

    return user;
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findOneBy({
      email: registerDto.email,
    });

    if (user) {
      throw new ConflictException(Errors.USER_ALREADY_EXIST);
    }

    const hashedPassword = hashSync(registerDto.password, 12);

    const operation = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values({ ...registerDto, password: hashedPassword })
      .returning('*')
      .execute();

    const candidate = operation.generatedMaps[0] as UserEntity;

    const tokens = this.generateTokens(candidate);

    await this.refreshRepository.save({
      userId: candidate.id,
      value: tokens.refreshToken,
    });

    return tokens;
  }

  public async login(user: UserEntity) {
    const tokens = this.generateTokens(user);

    await this.refreshRepository.save({
      userId: user.id,
      value: tokens.refreshToken,
    });

    return tokens;
  }

  private generateTokens(user: UserEntity) {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      role: user.role,
    });

    const refreshToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: process.env.REFRESH_EXP_IN },
    );

    return { refreshToken, accessToken };
  }
}
