import { Form, Button, Checkbox, Input, FormProps, Card } from 'antd';
import type { LoginFormType } from './types';

const LoginForm: React.FC = () => {
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
  };

  return (
    <Card className="w-full max-w-sm shadow-md">
      <Form<LoginFormType> {...formConfig}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
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
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
