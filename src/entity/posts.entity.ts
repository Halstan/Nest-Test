import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Posts {
  @ApiHideProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  text: string;

  @Column({
    default: false,
  })
  isCompleted: boolean;

  @ApiHideProperty()
  @Column({
    default: new Date(),
    update: false,
  })
  dateCreated: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.posts, {
    nullable: false,
  })
  @ApiHideProperty()
  usuario: Usuario;
}
