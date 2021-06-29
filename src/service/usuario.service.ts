import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/entity/rol.entity';

@Injectable()
export class UsuarioService {
  private salt = 10;

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['rol'] });
  }

  async addUsuario(usuario: Usuario): Promise<Usuario> {
    usuario.contrasenha = await bcrypt.hash(usuario.contrasenha, this.salt);
    usuario.rol = new Rol('4eb683b2-3abf-462f-b21f-f275a7eed0af');
    return this.usuarioRepository.save(usuario);
  }

  findById(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOne(id);
  }

  async updateUsuario(id: string, usuario: Usuario): Promise<Usuario> {
    const usu = await this.usuarioRepository.findOne(id);
    if (usuario) {
      const res = this.usuarioRepository.merge(usu, usuario);
      res.contrasenha = await bcrypt.hash(res.contrasenha, this.salt);
      return await this.usuarioRepository.save(res);
    }
  }

  async deleteUsuario(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
