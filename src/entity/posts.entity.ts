import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Posts {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
    nullable: false,
  })
  autor: string;

  @Column({
    length: 150,
  })
  text: string;

  @ApiHideProperty()
  @Column({
    default: new Date(),
    update: false,
  })
  dateCreated: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.posts)
  usuario: Usuario;
}
