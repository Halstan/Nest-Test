import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../entity/posts.entity';
import { Usuario } from '../entity/usuario.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Posts[]> {
    return this.postRepository.find({ relations: ['usuario'] });
  }

  async addPost(post: Posts, username: string): Promise<Posts> {
    const usuario = await this.usuarioRepository.findOne({
      nombreDeUsuario: username,
    });
    post.usuario = usuario;
    return await this.postRepository.save(post);
  }

  async findByUsuario(username: string) {
    return await this.postRepository
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.usuario', 'usuario')
      .where('usuario.nombreDeUsuario = :username', { username: username })
      .getMany();
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
