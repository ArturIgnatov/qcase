import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { UserEntity } from '../../entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { InviteRegisterDto } from './dto/invite-register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    type: TokenDto,
  })
  @Post('/login')
  @UsePipes(new ValidationPipe())
  private login(
    @Body() loginDto: LoginDto,
    @Request() req: ExpressRequest & { user: UserEntity },
  ) {
    return this.authService.login(req.user);
  }

  @UsePipes(new ValidationPipe())
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    type: TokenDto,
  })
  @Post('/register')
  private register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UsePipes(new ValidationPipe())
  @ApiBody({ type: InviteRegisterDto })
  @ApiResponse({
    type: TokenDto,
  })
  @Post('/invite-register')
  private inviteRegistry(@Body() inviteRegisterDto: InviteRegisterDto) {
    return this.authService.inviteRegister(inviteRegisterDto);
  }

  @Post('/update-token')
  @ApiBody({ type: UpdateTokenDto })
  private updateRefresh(
    @Body() updateTokenDto: UpdateTokenDto,
    @Request() req: ExpressRequest,
  ) {
    return;
  }
}
