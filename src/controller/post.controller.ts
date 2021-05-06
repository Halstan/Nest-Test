import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Posts } from '../entity/posts.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller({
  path: '/posts',
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<Posts[]> {
    return this.postService.findAll();
  }

  @Post()
  addPost(@Body() post: Posts): Promise<Posts> {
    return this.postService.addPost(post);
  }

  @Get(':id')
  findPost(@Param('id') id: number): Promise<Posts> {
    return this.postService.findById(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() post: Posts): Promise<Posts> {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  deletPost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
