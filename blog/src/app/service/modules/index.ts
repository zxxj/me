import { http } from '..';

const PRIFIX_PATH = '/posts';
export const getPostList = async () => {
  return await http.get(`${PRIFIX_PATH}/list`);
};
