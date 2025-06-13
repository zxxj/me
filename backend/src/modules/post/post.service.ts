import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostVo } from './dto/list-auth.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    const post = this.postRepository.create({
      ...createPostDto,
      author_id: authorId,
    });
    await this.postRepository.save(post);
    return '文章创建成功';
  }

  async findAll(
    pageNum = 1,
    pageSize = 10,
  ): Promise<{ posts: PostVo[]; total: number }> {
    const [posts, total] = await this.postRepository.findAndCount({
      where: { isPublished: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });

    const vo = posts.map((post) => ({
      id: post.id,
      author_id: post.author_id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      commentCount: post.commentCount,
      likeCount: post.likeCount,
      viewCount: post.viewCount,
      isPublished: post.isPublished,
      author: {
        username: post.author.username,
        email: post.author.email,
        avatar: post.author.avatar,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return { posts: vo, total };
  }

  async findOne(id: number): Promise<PostVo> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`文章 ID ${id} 不存在`);
    }

    const vo = {
      id: post.id,
      author_id: post.author_id,
      title: post.title,
      summary: post.summary,
      content: post.content,
      commentCount: post.commentCount,
      likeCount: post.likeCount,
      viewCount: post.viewCount,
      isPublished: post.isPublished,
      author: {
        username: post.author.username,
        email: post.author.email,
        avatar: post.author.avatar,
      },
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };

    return vo;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    authorId: number,
  ): Promise<string> {
    const post = await this.findOne(id);
    if (post.author_id !== authorId) {
      throw new NotFoundException('您没有权限修改此文章');
    }
    Object.assign(post, updatePostDto);
    await this.postRepository.save(post);
    return '文章更新成功';
  }

  async remove(id: number, authorId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post || post.author.id !== authorId) {
      throw new NotFoundException('您没有权限删除此文章!');
    }

    await this.postRepository.remove(post);
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.postRepository.increment({ id }, 'viewCount', 1);
  }
}
