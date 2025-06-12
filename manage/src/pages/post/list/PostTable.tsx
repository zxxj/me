import { Table, TableColumnsType, Tag } from 'antd';
import { TableColumns } from './type';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { list } from '@/service/modules/post';
import dayjs from 'dayjs';

export interface PostTableRef {
  fetchData: () => void;
}

const PostTable: React.FC = forwardRef<PostTableRef>((_, ref) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TableColumns[]>([]);
  const [params, setParams] = useState({ pageNum: 1, pageSize: 10 });
  const [total, setTotal] = useState(0);

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

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
      render: (_, record) => {
        return record.isPublished ? (
          <Tag color="success">已发布</Tag>
        ) : (
          <Tag color="error">未发布</Tag>
        );
      },
    },
    {
      key: 'author',
      title: '作者名称',
      dataIndex: 'author',
      align: 'center',
      render: (_, record) => {
        return record.author.username;
      },
    },
    {
      key: 'createdAt',
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      render: (_, record) => {
        return dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      key: 'updatedAt',
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (_, record) => {
        return dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  const fetchData = useCallback(async () => {
    setData([]);
    setLoading(true);
    try {
      const { data } = await list(params);
      setData(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Table
      rowKey={(record) => record.title}
      dataSource={data}
      columns={columns}
      bordered
      size="middle"
      loading={loading}
      pagination={{
        position: ['bottomCenter'],
        total,
        pageSize: params.pageSize,
        current: params.pageNum,
        onChange: (page, pageSize) => setParams({ pageNum: page, pageSize }),
      }}
    />
  );
});

export default PostTable;
