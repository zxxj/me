import { Button, Card, Divider } from 'antd';
import PostTable, { PostTableRef } from './PostTable';
import UseEditor from './Editor';
import { useRef, useState } from 'react';
import { PostItem } from './type';

const PostList: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const tableRef = useRef<PostTableRef>(null);
  const [editData, setEditData] = useState<PostItem | null>(null);

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
          editData={editData ?? null}
          visible={showEditor}
          setVisible={setShowEditor}
          onSuccess={handleSuccess}
        />

        <PostTable
          ref={tableRef}
          onSuccess={handleSuccess}
          setVisible={setShowEditor}
          setEditData={setEditData}
        />
      </Card>
    </>
  );
};

export default PostList;
