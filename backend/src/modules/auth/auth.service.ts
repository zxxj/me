import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user-dto';
import { CreateUserDto } from '../user/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
      message: '登录成功!',
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
      message: '注册成功!',
    };
  }
}
