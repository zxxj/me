export interface ListAuthVo {
  avatar: string;
  email: string;
  username: string;
}

export interface PostVo {
  id: number;
  title: string;
  summary: string;
  content: string;
  author_id: number;
  commentCount: number;
  cover: string;
  likeCount: number;
  viewCount: number;
  isPublished: boolean;
  author: ListAuthVo;
  createdAt: Date;
  updatedAt: Date;
}
