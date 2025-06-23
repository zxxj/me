import { list } from '@/app/service/modules/post/index';
import PostList from './PostList'; // 引入客户端组件

export default async function HomePage() {
  await new Promise((res) => setTimeout(res, 3000));

  const { posts } = await list();

  return <PostList data={posts} />;
}
