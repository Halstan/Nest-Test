import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Posts } from '../entity/posts';

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
}
