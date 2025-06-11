import { Menu as AntMenu, MenuProps } from 'antd';
import {
  SettingOutlined,
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: '首页',
      key: 'dashboard',
      icon: <HomeOutlined />,
    },
    {
      label: '文章管理',
      key: 'post',
      icon: <FileTextOutlined />,
      children: [
        {
          label: '发布文章',
          key: 'publish',
        },
        {
          label: '管理文章',
          key: 'action',
        },
      ],
    },
    {
      label: '系统管理',
      key: 'system',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: 'user',
        },
      ],
    },
    {
      key: 'antd',
      label: (
        <a
          href="https://ant-design.antgroup.com/index-cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Antd文档
        </a>
      ),
    },
  ];

  const handleItem: MenuProps['onClick'] = (item) => {
    const { keyPath } = item;

    // 如果是二级菜单需要拼接
    if (keyPath.length > 1) {
      navigate(`/${keyPath[1]}/${keyPath[0]}`);
    } else {
      navigate(`/${keyPath[0]}`);
    }
  };
  return (
    <>
      <AntMenu
        className="h-screen"
        items={items}
        mode="inline"
        defaultSelectedKeys={['index']}
        onClick={handleItem}
        theme={'dark'}
      />
    </>
  );
};

export default Menu;
