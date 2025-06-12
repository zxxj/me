import '@wangeditor-next/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react';
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor-next/editor';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Modal } from 'antd';
import type { CreatePost } from './type';
import { create } from '@/service/modules/post';

interface UseEditorType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const UseEditor: React.FC<UseEditorType> = ({ visible, setVisible }) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  const [form] = Form.useForm<CreatePost>();

  // 编辑器内容
  const [html, setHtml] = useState('<p></p>');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.content = html;
      console.log(values);
      const res = await create(values);
      console.log(res);
      // setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        className=" overflow-hidden"
        title="Basic Modal"
        closable
        maskClosable
        destroyOnHidden
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={{
          xxl: '80%',
        }}
      >
        <Form<CreatePost> form={form} layout="vertical">
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
            style={{ height: '500px', overflowY: 'hidden' }}
          />
        </motion.div>
      </Modal>
    </>
  );
};

export default UseEditor;
