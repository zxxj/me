import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空!' })
  username: string;

  @IsEmail({}, { message: '邮箱格式不正确!' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空!' })
  @MinLength(6, { message: '密码长度不能小于6位!' })
  password: string;
}
