import { User } from '@/types/auth';
import React from 'react';

// 文章表格columns
export interface TableColumns {
  key: React.Key;
  title: string;
  content: string;
  summary: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  isPublished: boolean;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

// 创建文章
export interface CreatePost {
  title: string;
  content: string;
  summary: string;
}
