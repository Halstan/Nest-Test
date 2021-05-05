import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {
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

  @Column({
    default: new Date(),
  })
  dateCreated: Date;
}
