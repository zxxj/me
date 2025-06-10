import { Menu as AntMenu, MenuItemProps } from 'antd';
import {
  SettingOutlined,
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { MenuItemType } from 'antd/es/menu/interface';

const Menu = () => {
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

  const handleItem = (item: MenuItemType) => {
    console.log(item);
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
