import { Button, Card, Divider } from 'antd';
import PostTable, { PostTableRef } from './PostTable';
import UseEditor from './Editor';
import { useRef, useState } from 'react';

const PostList: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const tableRef = useRef<PostTableRef>(null);

  const handlePublish = () => {
    setShowEditor(true);
  };

  const handleSuccess = () => {
    setShowEditor(false);
    tableRef.current?.fetchData();
  };

  return (
    <>
      <Card></Card>

      <Card>
        <Button type="primary" size="middle" onClick={handlePublish}>
          发布文章
        </Button>

        <Divider />

        <UseEditor
          visible={showEditor}
          setVisible={setShowEditor}
          onSuccess={handleSuccess}
        />

        <PostTable ref={tableRef} />
      </Card>
    </>
  );
};

export default PostList;
