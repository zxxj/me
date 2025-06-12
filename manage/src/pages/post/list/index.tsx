import { Button, Card, Divider } from 'antd';
import PostTable from './PostTable';
import UseEditor from './Editor';
import { useState } from 'react';

const PostList: React.FC = () => {
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const handlePublish = () => {
    setShowEditor(true);
  };
  return (
    <>
      <Card></Card>

      <Card>
        <Button type="primary" size="middle" onClick={handlePublish}>
          发布文章
        </Button>

        <Divider />

        <UseEditor visible={showEditor} setVisible={setShowEditor} />

        <PostTable />
      </Card>
    </>
  );
};

export default PostList;
