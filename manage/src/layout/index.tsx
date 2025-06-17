import { Layout as AntdLayout } from 'antd';
import React from 'react';
import Menu from './Menu';
import { Outlet } from 'react-router-dom';
import UseDropdown from './Dropdown';
const { Sider, Header, Content } = AntdLayout;

const Layout: React.FC = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* 左侧 Sider */}
      <Sider
        width={200}
        className="text-white"
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Menu />
      </Sider>

      {/* 右侧主布局：上下结构 */}
      <AntdLayout className="flex flex-col flex-1 overflow-hidden">
        {/* 顶部 Header，固定高度 */}
        <Header className=" shadow px-4 flex items-center h-16 !text-white justify-between">
          <div>header</div>

          <UseDropdown />
        </Header>

        {/* 内容区域：占满剩余高度 + 内部滚动 */}
        <Content className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 overflow-x-hidden">
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  );
};

export default Layout;
