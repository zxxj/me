import { getPostList } from '@/app/service/modules/index';
import PostList from './PostList'; // 引入客户端组件

export default async function HomePage() {
  await new Promise((res) => setTimeout(res, 3000));

  const data = (await getPostList()).data.data.posts;
  console.log(data);

  return <PostList data={data} />;
}
