import { CreatePost } from '@/pages/post/list/type';
import { http } from '../index';

const PREFIX = '/posts';

export const create = (dto: CreatePost) => {
  return http.post(`${PREFIX}/create`, dto);
};
