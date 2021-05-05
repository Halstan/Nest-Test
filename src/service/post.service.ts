import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../entity/posts';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  findAll(): Promise<Posts[]> {
    return this.postRepository.find();
  }

  addPost(post: Posts): Promise<Posts> {
    return this.postRepository.save(post);
  }

  findById(id: number): Promise<Posts> {
    return this.postRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
