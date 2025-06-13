import { User } from '@/types/auth';
import React from 'react';

interface AuthorType {
  avatar: string;
  username: string;
  email: string;
}

// 文章表格columns
export interface TableColumns {
  key: React.Key;
  id: number;
  authorId: number;
  title: string;
  content: string;
  summary: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isPublished: boolean;
  author: AuthorType;
  createdAt: Date;
  updatedAt: Date;
}

// 创建文章
export interface CreatePost {
  title: string;
  content: string;
  summary: string;
}

// 编辑文章
export interface UpdatePostDto {
  title: string;
  content: string;
  summary: string;
}

// 表格每一项item的类型
export interface PostItem {
  id: number;
  authorId: number;
  title: string;
  summary: string;
  content: string;
  author: AuthorType;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
