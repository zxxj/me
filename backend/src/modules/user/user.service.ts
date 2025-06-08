import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
import { UserLoginVo } from './vo/user-login-vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // 取出用户名和邮箱和密码
    const { username, email, password } = createUserDto;

    // 查询用户是否存在
    const exist = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    // 如果用户存在,则抛出错误
    if (exist) {
      throw new BadRequestException('用户名或邮箱已存在');
    }

    // 对密码进行加密
    const hash = await bcrypt.hash(password, 10);

    // 创建并保存用户
    const user = await this.userRepository.save({
      username,
      email,
      password: hash,
    });

    return this.toUserResponse(user);
  }

  async login(loginUserDto: LoginUserDto) {
    // 取出用户名和密码
    const { username, password } = loginUserDto;

    // 查询用户是否存在
    const user = await this.userRepository.findOne({
      where: { username },
    });

    // 如果用户不存在,则抛出错误
    if (!user) {
      throw new BadRequestException('用户名不存在!');
    }

    // 比较密码
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 如果密码不正确,则抛出错误
    if (!isPasswordValid) {
      throw new BadRequestException('密码错误!');
    }

    // 返回用户信息
    return this.toUserResponse(user);
  }

  private toUserResponse(user: User): UserLoginVo {
    const { password, ...UserLoginVo } = user;
    return UserLoginVo;
  }
}
