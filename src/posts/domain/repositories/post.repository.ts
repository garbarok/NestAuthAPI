import { Post } from '../entities/post.entity';

export interface PostRepository {
  create(post: Post): Promise<Post>;
  findAll(): Promise<Post[]>;
  findOne(id: string): Promise<Post | null>;
  update(id: string, post: Partial<Post>): Promise<Post>;
  remove(id: string): Promise<void>;
}
