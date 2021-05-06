import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../entity/usuario.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Post()
  addUsuario(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.addUsuario(usuario);
  }

  @Get(':id')
  findUsuario(@Param('id') id: string): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Put(':id')
  updateUsuario(@Param('id') id: string, @Body() usuario: Usuario) {
    return this.usuarioService.updateUsuario(id, usuario);
  }

  @Delete(':id')
  deleteUsuario(@Param('id') id: string) {
    return this.usuarioService.deleteUsuario(id);
  }
}
