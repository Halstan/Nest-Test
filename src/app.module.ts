import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { PostModule } from './modules/post.module';
import { UsuarioModule } from './modules/usuario.module';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [PostModule, TypeOrmModule.forRoot(), UsuarioModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
