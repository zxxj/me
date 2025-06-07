import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const exist = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (exist) {
      throw new BadRequestException('用户名或邮箱已存在');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException('用户名不存在!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('密码错误!');
    }

    return user;
  }
}
