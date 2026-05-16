import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  minBlind: number;

  @Column({ default: true })
  isActive: boolean;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.rooms, {
    eager: true,
  })
  users: User[];
}
