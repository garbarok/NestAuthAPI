import { User } from '../../../users/domain/entities/user.entity';

export class Post {
  readonly id?: string;
  readonly title: string;
  readonly content: string;
  readonly authorId: string;
  readonly author?: User;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor({
    id,
    title,
    content,
    authorId,
    author,
    createdAt,
    updatedAt,
  }: Partial<Post>) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
