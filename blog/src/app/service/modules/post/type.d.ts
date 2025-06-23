interface Post {
  author: {
    username: string;
    email: string;
    avatar: string | null;
  };
  id: number;
  authorId: number;
  title: string;
  commentCount: number;
  viewCount: number;
  content: string;
  summary: string;
  cover: string;
  likeCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostListVo {
  code: number;
  posts: Post[];
  message: string;
}
