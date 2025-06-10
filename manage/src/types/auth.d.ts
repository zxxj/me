// 登录表单
export interface LoginFormType {
  username: string;
  password: string;
  email: string;
  remember?: boolean;
}

// 登录dto
export interface LoginUserDto {
  username: string;
  password: string;
  email: string;
}

// 登录vo
interface User {
  id: number;
  avatar: string;
  username: string;
  email: string;
  provider: string | null;
  providerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginUserVo {
  code: number;
  data: {
    access_token: string;
    message: string;
    user: User;
  };
  message: string;
}
