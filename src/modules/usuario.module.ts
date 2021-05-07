import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioController } from '../controller/usuario.controller';
import { Usuario } from '../entity/usuario.entity';
import { Rol } from 'src/entity/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
