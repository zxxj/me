import { CreatePost, UpdatePostDto } from '@/pages/post/list/type';
import { http } from '../index';
import { CreatePostVo } from '@/types/post';

const PREFIX = '/posts';

export const create = (dto: CreatePost): Promise<CreatePostVo> => {
  return http.post(`${PREFIX}/create`, dto);
};

export const list = (queryParams: { pageNum: number; pageSize: number }) => {
  return http.get(`${PREFIX}/list`, { params: queryParams });
};

export const findById = async (id: number) => {
  return await http.get(`${PREFIX}/${id}`);
};

export const update = async (id: number, dto: UpdatePostDto) => {
  return await http.patch(`${PREFIX}/${id}`, dto);
};

export const remove = async (id: number) => {
  return await http.delete(`${PREFIX}/${id}`);
};
