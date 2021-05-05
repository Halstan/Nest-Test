import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { Posts } from '../entity/posts';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
