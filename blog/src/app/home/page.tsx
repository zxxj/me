import { getPostList } from '@/app/service/modules/index';
import PostList from './PostList'; // 引入客户端组件

export default async function HomePage() {
  await new Promise((res) => setTimeout(res, 3000));

  // const data = (await getPostList()).data.data.posts;
  const data = [
    { id: 1, title: '测试文章 1' },
    { id: 2, title: '测试文章 2' },
  ];

  return <PostList data={data} />;
}
