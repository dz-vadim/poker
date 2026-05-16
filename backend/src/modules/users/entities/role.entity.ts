import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("roles")
export class Role {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "ADMIN" })
  @Column()
  name: string;

  @ApiProperty({ type: () => [User], required: false })
  @ManyToMany(() => User, (user) => user.roles, {
    lazy: true,
  })
  users: Promise<User[]>;
}
