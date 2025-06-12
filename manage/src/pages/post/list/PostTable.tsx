import { Table, TableColumnsType } from 'antd';
import { TableColumns } from './type';
import { useState } from 'react';

const PostTable: React.FC = () => {
  const [data, setData] = useState<TableColumns[]>([]);

  const columns: TableColumnsType<TableColumns> = [
    {
      key: 'title',
      title: '文章标题',
      dataIndex: 'title',
      align: 'center',
    },
    {
      key: 'content',
      title: '文章内容',
      dataIndex: 'content',
      align: 'left',
    },
    {
      key: 'summary',
      title: '文章概要',
      dataIndex: 'summary',
      align: 'left',
    },
    {
      key: 'viewCount',
      title: '浏览量',
      dataIndex: 'viewCount',
      align: 'center',
    },
    {
      key: 'likeCount',
      title: '点赞量',
      dataIndex: 'likeCount',
      align: 'center',
    },
    {
      key: 'commentCount',
      title: '评论量',
      dataIndex: 'commentCount',
      align: 'center',
    },
    {
      key: 'isPublished',
      title: '发布状态',
      dataIndex: 'isPublished',
      align: 'center',
    },
    {
      key: 'author',
      title: '作者名称',
      dataIndex: 'author',
      align: 'center',
    },
    {
      key: 'authorId',
      title: '作者ID',
      dataIndex: 'authorId',
      align: 'center',
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
    },
  ];

  return <Table dataSource={data} columns={columns} bordered size="middle" />;
};

export default PostTable;
