import { CreatePost } from '@/pages/post/list/type';
import { http } from '../index';
import { CreatePostVo } from '@/types/post';

const PREFIX = '/posts';

export const create = (dto: CreatePost): Promise<CreatePostVo> => {
  return http.post(`${PREFIX}/create`, dto);
};

export const list = (queryParams: { pageNum: number; pageSize: number }) => {
  return http.get(`${PREFIX}/list`, { params: queryParams });
};
