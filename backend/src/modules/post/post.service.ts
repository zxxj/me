import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: number): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      author_id: authorId,
    });
    return this.postRepository.save(post);
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ posts: Post[]; total: number }> {
    const [posts, total] = await this.postRepository.findAndCount({
      where: { isPublished: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { posts, total };
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException(`文章 ID ${id} 不存在`);
    }
    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    authorId: number,
  ): Promise<Post> {
    const post = await this.findOne(id);
    if (post.author_id !== authorId) {
      throw new NotFoundException('您没有权限修改此文章');
    }
    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: number, authorId: number): Promise<void> {
    const post = await this.findOne(id);
    if (post.author_id !== authorId) {
      throw new NotFoundException('您没有权限删除此文章');
    }
    await this.postRepository.remove(post);
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.postRepository.increment({ id }, 'viewCount', 1);
  }
}
