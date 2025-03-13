import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from '../../domain/entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../../../users/infrastructure/entities/user.entity';
import { User } from '../../../users/domain/entities/user.entity';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(post: Post): Promise<Post> {
    const author = await this.userRepo.findOne({
      where: { id: post.authorId },
    });
    if (!author) {
      throw new NotFoundException(`User with ID ${post.authorId} not found`);
    }

    const postEntity = this.toEntity(post);
    postEntity.author = author;

    const savedEntity = await this.postRepo.save(postEntity);
    return this.mapToDomain(savedEntity);
  }

  async findAll(): Promise<Post[]> {
    const entities = await this.postRepo.find({ relations: ['author'] });
    return entities.map(entity => this.mapToDomain(entity));
  }

  async findOne(id: string): Promise<Post | null> {
    const entity = await this.postRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!entity) {
      return null;
    }

    return this.mapToDomain(entity);
  }

  async update(id: string, postData: Partial<Post>): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Update only the fields that are provided
    if (postData.title) post.title = postData.title;
    if (postData.content) post.content = postData.content;

    const updatedEntity = await this.postRepo.save(post);
    return this.mapToDomain(updatedEntity);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postRepo.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.postRepo.remove(post);
  }

  private toEntity(post: Post): PostEntity {
    const entity = new PostEntity();
    entity.title = post.title;
    entity.content = post.content;
    entity.authorId = post.authorId;
    return entity;
  }

  private mapToDomain(entity: PostEntity): Post {
    let author: User | undefined;

    if (entity.author) {
      author = new User({
        id: entity.author.id,
        name: entity.author.name,
        email: entity.author.email,
        password: entity.author.password,
      });
    }

    return new Post({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      authorId: entity.authorId,
      author,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }
}
