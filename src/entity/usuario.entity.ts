import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Posts } from './posts.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { Token } from './token.entity';
import { Rol } from './rol.entity';

@Entity()
export class Usuario {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 40,
    nullable: false,
  })
  nombre: string;

  @Column({
    length: 40,
    nullable: true,
  })
  apellidos: string;

  fechaNacimiento: Date;

  @ApiHideProperty()
  @Column({
    default: true,
  })
  estado: boolean;

  @Column({
    length: 40,
    nullable: false,
    unique: true,
  })
  nombreDeUsuario: string;

  @Column({
    length: 90,
    nullable: false,
  })
  contrasenha: string;

  @ApiHideProperty()
  @OneToMany(() => Posts, (posts) => posts.usuario)
  posts: Posts[];

  @ApiHideProperty()
  @OneToMany(() => Token, (token) => token.usuario)
  tokens: Token[];

  @ApiHideProperty()
  @ManyToOne(() => Rol, (rol) => rol.usuarios, {
    eager: true,
  })
  rol: Rol;
}
