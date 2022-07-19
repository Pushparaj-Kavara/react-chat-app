import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Public } from './auth/auth.decorators';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { UsersService } from './users/user.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('auth/sign-up')
  async signUp(@Res() response: Response, @Body() createUser: AuthDto) {
    const { username, email, password } = createUser;
    if (!username) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Username cannot be Empty!' });
    }
    if (!email) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email cannot be Empty!' });
    }
    if (!password) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Password cannot be Empty!' });
    }
    const duplicate = await this.usersService.getByCondition({
      $or: [{ username }, { email }],
    });
    if (duplicate && duplicate.username === username) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Username already taken try different username!' });
    }
    if (duplicate && duplicate.email === email) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Email already used!' });
    }
    const decimal =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!password.match(decimal)) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:
          'Password must be between 8 to 15 characters with atleast one lowercase letter, one uppercase letter, one numeric digit, and one special character!',
      });
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUser.password, saltOrRounds);
    createUser.password = hash;
    const newRegisteredUser = await this.usersService.create(createUser);
    response.status(HttpStatus.OK).json({
      message: 'Registered Successfully!',
      username: newRegisteredUser.username,
    });
  }

  @Public()
  @Post('auth/sign-in')
  async signIn(@Res() response: Response, @Body() dto: AuthDto) {
    const payload = await this.authService.validateUser(dto);
    const { access_token } = await this.authService.login(payload);
    return response.status(HttpStatus.OK).json({
      message: 'Sign In Successfull.',
      access_token,
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
