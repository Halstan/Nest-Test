import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Rol {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 30,
    nullable: false,
    unique: true,
  })
  nombre: string;

  @ApiHideProperty()
  @OneToMany(() => Usuario, (usuario) => usuario.rol)
  usuarios: Usuario[];

  constructor(id: string) {
    this.id = id;
  }
}
