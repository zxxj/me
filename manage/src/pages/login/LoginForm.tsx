import { Form, Button, Checkbox, Input, FormProps, Card, message } from 'antd';
import type { LoginFormType } from '@/types/auth';
import { login } from '@/service/modules/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // 表单提交
  const onFinish: FormProps<LoginFormType>['onFinish'] = async (values) => {
    setLoading(true);
    delete values.remember;

    try {
      const { code, data, message } = await login(values);

      if (code === 200 || code === 201) {
        await messageApi.success(data.message);
        navigate('/');
      } else {
        messageApi.warning(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 表单验证失败
  const onFinishFailed: FormProps<LoginFormType>['onFinishFailed'] = (err) => {
    console.log(err);
  };

  const formConfig: FormProps = {
    layout: 'horizontal',
    labelAlign: 'right',
    labelCol: {
      xs: { span: 8 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 18 },
    },
    initialValues: { remember: true },
    autoComplete: 'off',
    onFinish: onFinish,
    onFinishFailed: onFinishFailed,
  };

  return (
    <Card className="w-full max-w-sm shadow-md">
      {contextHolder}
      <Form<LoginFormType> {...formConfig}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入邮箱' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex justify-between items-center mb-4">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Button type="link">还没有账号？去注册</Button>
        </div>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
