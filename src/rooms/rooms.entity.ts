import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'capacity' })
  capacity: number;

  @Column({ name: 'userId' })
  userId: number;
}
