import {
  DownOutlined,
  SettingOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useUserStore } from '@/store/user';
import { Dropdown, MenuProps, Modal, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UseDropdown = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'ovo',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: '退出',
      extra: '⌘P',
      icon: <WalletOutlined />,
    },
    {
      key: '4',
      label: 'Settings',
      icon: <SettingOutlined />,
      extra: '⌘S',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (Number(key) === 2) {
      setIsModalOpen(true);
    }
  };

  const handleOk = async () => {
    setIsLoading(true);

    try {
      await useUserStore.getState().clearState();
      navigate('/login');
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Dropdown menu={{ items, onClick }}>
        <Space>
          <div className=" cursor-pointer">
            {useUserStore.getState().userInfo?.username}
            <DownOutlined />
          </div>
        </Space>
      </Dropdown>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="退出"
        closable={{ 'aria-label': 'Custom Close Button' }}
        okText="确定"
        cancelText="关闭"
        loading={isLoading}
      >
        确定要退出登录吗?
      </Modal>
    </>
  );
};

export default UseDropdown;
