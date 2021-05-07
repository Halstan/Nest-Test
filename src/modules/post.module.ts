import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { Posts } from '../entity/posts.entity';
import { JwtStrategy } from '../security/JwtStrategy';
import { PassportModule } from '@nestjs/passport';
import { Usuario } from '../entity/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Usuario]), PassportModule],
  controllers: [PostController],
  providers: [PostService, JwtStrategy],
})
export class PostModule {}
