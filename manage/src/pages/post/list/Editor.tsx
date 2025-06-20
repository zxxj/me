import '@wangeditor-next/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react';
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor-next/editor';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, message, Modal } from 'antd';
import type { CreatePost, PostItem } from './type';
import { create, update } from '@/service/modules/post';

interface UseEditorType {
  visible: boolean;
  editData: PostItem | null;
  setVisible: (visible: boolean) => void;
  onSuccess: () => void;
}

const UseEditor: React.FC<UseEditorType> = ({
  editData,
  visible,
  setVisible,
  onSuccess,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm<CreatePost>();

  // 编辑器内容
  const [html, setHtml] = useState('<p></p>');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  const handleOk = async () => {
    setIsLoading(true);

    try {
      const values = await form.validateFields();
      values.content = html;
      if (editData) {
        console.log(editData);
        const { data } = await update(editData.id, values);
        await messageApi.success(data);
      } else {
        const { data } = await create(values);
        await messageApi.success(data);
      }
      onSuccess?.();
      setVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setHtml('<p></p>');
    form.resetFields();
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  useEffect(() => {
    if (editData) {
      setHtml(editData.content);
      console.log(editData);
      form.setFieldsValue({ ...editData });
    }
  }, [editData]);

  return (
    <>
      {contextHolder}
      <Modal
        className=" overflow-hidden"
        title="Basic Modal"
        closable
        destroyOnHidden
        maskClosable
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={{
          xxl: '70%',
        }}
        confirmLoading={isLoading}
      >
        <Form<CreatePost> form={form} layout="inline">
          <div className="flex flex-col gap-2 w-full mb-4">
            <Form.Item
              label="文章标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="文章概要"
              name="summary"
              rules={[{ required: true, message: '请输入文章概要!' }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </Form>
        <motion.div
          style={{ border: '1px solid #ccc', zIndex: 100 }}
          initial={{
            x: -800,
            y: -800,
            opacity: 0,
            rotate: -45,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 12,
          }}
        >
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />

          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{ height: '400px', overflowY: 'hidden' }}
          />
        </motion.div>
      </Modal>
    </>
  );
};

export default UseEditor;
