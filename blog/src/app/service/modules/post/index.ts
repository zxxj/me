import { http } from '../../index';
import { PostListVo } from './type';

const PRIFIX_PATH = '/posts';
export const list = async (): Promise<PostListVo> => {
  return await http.get(`${PRIFIX_PATH}/list`);
};
