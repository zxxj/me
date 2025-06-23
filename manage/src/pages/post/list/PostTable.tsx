import {
  Button,
  Image,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
  message,
} from 'antd';
import { PostItem, TableColumns } from './type';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { findById, list, remove } from '@/service/modules/post';
import dayjs from 'dayjs';

export interface PostTableRef {
  fetchData: () => void;
}

interface PostTableProps {
  setVisible: (visible: boolean) => void;
  setEditData: (data: any) => void;
  onSuccess: () => void;
}

const PostTable = forwardRef<PostTableRef, PostTableProps>(
  ({ setVisible, setEditData, onSuccess }, ref) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<TableColumns[]>([]);
    const [params, setParams] = useState({ pageNum: 1, pageSize: 10 });
    const [total, setTotal] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    useImperativeHandle(ref, () => ({
      fetchData,
    }));

    const columns: TableColumnsType<TableColumns> = [
      {
        key: 'cover',
        title: '封面',
        dataIndex: 'cover',
        align: 'center',
        render: (_, record) => {
          record.cover = record.cover.replaceAll('\\', '/');
          return (
            <Image
              src={`http://localhost:9000/${record.cover}`}
              width={100}
              height={100}
            />
          );
        },
      },
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
      {
        key: 'action',
        title: '操作',
        align: 'center',
        render: (_, record) => (
          <>
            <Button
              variant="link"
              color="primary"
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
            <Button variant="link" color="danger">
              <Popconfirm
                title="确定删除吗?"
                cancelText="取消"
                okText="确定"
                onConfirm={() => handleDelete(record)}
              >
                删除
              </Popconfirm>
            </Button>
          </>
        ),
      },
    ];

    const handleEdit = async (record: PostItem) => {
      setVisible(true);
      const res = await findById(record.id);
      setEditData(res.data);
    };

    const handleDelete = async (record: PostItem) => {
      setLoading(true);
      try {
        await remove(record.id);
        await onSuccess?.();
        messageApi.success('删除成功!');
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

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
      <>
        {contextHolder}
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
            onChange: (page, pageSize) =>
              setParams({ pageNum: page, pageSize }),
          }}
        />
      </>
    );
  },
);

export default PostTable;
