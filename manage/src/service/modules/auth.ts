import { LoginUserDto, LoginUserVo } from '@/types/auth';
import { http } from '../index';

const PREFIX = '/auth';

// 登录
export const login = async (dto: LoginUserDto): Promise<LoginUserVo> => {
  return await http.post(`${PREFIX}/login`, dto);
};
