import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  private salt = 10;

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async addUsuario(usuario: Usuario): Promise<Usuario> {
    usuario.contrasenha = await bcrypt.hash(usuario.contrasenha, this.salt);
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
