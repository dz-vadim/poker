import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Room } from "../../rooms/entities/room.entity";
import { Wallet } from "../../wallets/entities/wallet.entity";

/**
 select u.*
 from user u
 where u.id = 1

 select *
 from room r
 where r.user_id = 1
 */


@Entity("users")
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "ivan.petrenko@example.com" })
  @Column()
  email: string;

  @ApiProperty({ example: "hashed_password", writeOnly: true })
  @Column()
  password: string;

  @ApiProperty({ example: "Petrenko" })
  @Column()
  surname: string;

  @ApiProperty({ example: "Ivan" })
  @Column()
  name: string;

  @ApiProperty({ type: () => [Role], required: false })
  @ManyToMany(() => Role, (role) => role.users, {
    eager: true,
  })
  @JoinTable()
  roles: Role[];

  @ApiProperty({ type: () => Wallet, required: false })
  @OneToOne(() => Wallet, (wallet) => wallet.user, {
    eager: true,
  })
  wallet: Wallet;

  @ApiProperty({ isArray: true, required: false })
  @ManyToMany(() => Room, (room) => room.users, {
    lazy: true,
  })
  rooms: Promise<Room[]>;
}
