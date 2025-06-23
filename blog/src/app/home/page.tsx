import { list } from '@/app/service/modules/post/index';
import PostList from './PostList'; // 引入客户端组件
import { Post } from '../service/modules/post/type';

export default async function HomePage() {
  await new Promise((res) => setTimeout(res, 3000));

  const posts: Post[] = [
    {
      author: {
        avatar: null,
        email: '1285367184@qq.com',
        username: 'zhangxinxin',
      },
      authorId: 1,
      commentCount: 0,
      content:
        '<p><br></p><p>由于最近项目中有一个生日提醒的功能,要求将每周7天平铺展示出来,然后让管理员去自己切换日期进行筛选某天是否有人过生日.</p><p>首先去看了element-plus的date-picker,发现它并不能很好的满足我的需求,也观察了其他一些主流的组件库与兜兜转转了一圈github,但还是并未发现能满足我所处需求的组件.</p><p>思前想后,好像只能手搓一个了,也幸亏实现起来并不是那么的麻烦,最后也成功的交出了比较完美的答卷.</p><p> github: <a href="https://github.com/zxxj/week-date-picker-vue3" target="_blank">Weekly Calendar</a> </p>',
      cover:
        'https://img1.baidu.com/it/u=3887707721,2443473445&fm=253&fmt=auto&app=120&f=JPEG?w=820&h=500',
      createdAt: new Date(),
      id: 60,
      isPublished: true,
      likeCount: 0,
      summary: 'Weekly Calendar',
      title: '一个优雅的周历(Weekly Calendar)组件 基于Vue3',
      updatedAt: new Date(),
      viewCount: 2,
    },
    {
      author: {
        avatar: null,
        email: '1285367184@qq.com',
        username: 'zhangxinxin',
      },
      authorId: 1,
      commentCount: 22,
      content: '<p>测试文章内容</p>',
      cover:
        'https://img0.baidu.com/it/u=860504467,749498002&fm=253&fmt=auto&app=120&f=JPEG?w=890&h=500',
      createdAt: new Date(),
      id: 60,
      isPublished: true,
      likeCount: 57,
      summary: 'Weekly Calendar',
      title: '这是一篇测试文章',
      updatedAt: new Date(),
      viewCount: 103,
    },
  ];

  // const { posts } = await list();

  return <PostList data={posts} />;
}
