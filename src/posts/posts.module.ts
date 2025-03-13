import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from './infrastructure/entities/post.entity';
import { UserEntity } from '../users/infrastructure/entities/user.entity';
import { PostController } from './infrastructure/controllers/post.controller';
import { PostService } from './application/services/post.service';
import { PostRepositoryImpl } from './infrastructure/repositories/post.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity])],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'PostRepository',
      useClass: PostRepositoryImpl,
    },
  ],
  exports: [PostService],
})
export class PostsModule {}
