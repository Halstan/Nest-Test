import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entity/usuario.entity';
import * as bcrypt from 'bcrypt';
import { Token } from '../entity/token.entity';
import { LoginDTO } from '../dto/login.dto';
import { BadCredentiasException } from '../exception/bad-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async login(usuario: LoginDTO) {
    const user = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.rol', 'rol')
      .where('usuario.nombreDeUsuario = :username', {
        username: usuario.username,
      })
      .getOne();
    if (user) {
      if (bcrypt.compareSync(usuario.password, user.contrasenha)) {
        const token = new Token();
        const payload = {
          nombre: user.nombre,
          apellido: user.apellidos,
          username: user.nombreDeUsuario,
          rol: user.rol.nombre,
        };

        const jwt = this.jwtService.sign(payload);
        token.token = jwt;
        token.usuario = user;
        this.tokenRepository.save(token);
        return { access_token: jwt };
      }
    } else throw new BadCredentiasException();
  }
}
