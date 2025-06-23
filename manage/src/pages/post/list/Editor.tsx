import '@wangeditor-next/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react';
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
} from '@wangeditor-next/editor';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Upload,
  UploadProps,
} from 'antd';
import type { CreatePost, PostItem } from './type';
import { create, update } from '@/service/modules/post';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useUserStore } from '@/store/user';

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
      values.cover = values.cover.file.response.data;
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

  const onClose = () => {
    setImageUrl('');
    form.resetFields();
  };
  // 上传封面
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
      editData.cover = editData.cover.replaceAll('\\', '/');

      setImageUrl(`http://localhost:9000/${editData.cover}`);
      form.setFieldsValue({ ...editData });
    }
  }, [editData]);

  return (
    <>
      {contextHolder}
      <Modal
        className="overflow-hidden"
        title="Basic Modal"
        closable
        destroyOnHidden
        maskClosable
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={onClose}
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
            <Form.Item
              label="文章封面"
              name="cover"
              rules={[{ required: true, message: '请上传封面!' }]}
            >
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:9000/api/posts/upload"
                headers={{
                  Authorization: `Bearer ${useUserStore.getState().token}`,
                }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="cover" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
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
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
