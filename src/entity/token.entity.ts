import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Usuario } from './usuario.entity';

@Entity()
export class Token {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 400,
    nullable: false,
  })
  token: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.tokens)
  usuario: Usuario;
}
