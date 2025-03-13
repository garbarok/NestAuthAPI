import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Post } from '../../domain/entities/post.entity';
import type { PostRepository } from '../../domain/repositories/post.repository';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @Inject('PostRepository')
    private readonly postRepository: PostRepository,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new Post({
      title: createPostDto.title,
      content: createPostDto.content,
      authorId: createPostDto.authorId,
    });

    return this.postRepository.create(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string): Promise<void> {
    return this.postRepository.remove(id);
  }
}
