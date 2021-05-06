import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Posts } from '../entity/posts.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  findAll(): Promise<Posts[]> {
    return this.postRepository.find({ relations: ['usuario'] });
  }

  addPost(post: Posts): Promise<Posts> {
    return this.postRepository.save(post);
  }

  findById(id: number): Promise<Posts> {
    return this.postRepository.findOne(id, { relations: ['usuario'] });
  }

  async updatePost(id: number, posts: Posts): Promise<Posts> {
    const post = await this.postRepository.findOne(id);
    if (post) {
      const res = this.postRepository.merge(post, posts);
      return await this.postRepository.save(res);
    }
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
