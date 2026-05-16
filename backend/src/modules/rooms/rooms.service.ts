import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Room } from "./entities/room.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { RoomDto } from "./dto/room.dto";

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async getAll(limit: number, page: number, isActive: boolean): Promise<RoomDto[]> {
    const rooms: Room[] = await this.roomRepository.find({
      where: {
        isActive,
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return rooms.map(
      (room): RoomDto => ({
        ...room,
        activePlayers: room.users ? room.users.length : 0,
      }),
    );
  }

  async getById(id: number): Promise<Room | null> {
    return await this.roomRepository.findOneBy({
      id: id,
    });
  }

  async create(roomDto: CreateRoomDto): Promise<Room> {
    const user = await this.usersService.findOne(roomDto.userId);
    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    return this.roomRepository.save({
      name: roomDto.name,
      minBlind: roomDto.minBlind,
      users: [user],
    });
  }

  async update(updateDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOneBy({ id: updateDto.userId });
    if (!room) {
      throw new NotFoundException("Room does not exist");
    }

    room.name = updateDto.name ? updateDto.name : room.name;
    room.isActive = updateDto.isActive ? updateDto.isActive : room.isActive;
    room.minBlind = updateDto.minBlind ? updateDto.minBlind : room.minBlind;

    return this.roomRepository.save(room);
  }
}

/**
 *
 *
 * 1R
 * 2R
 * 3R
 * 4R
 * ..
 * 50R
 *
 * SELECT *
 * FROM table
 * WHERE isActive = $1
 * LIMIT 10 offset 0
 *
 * offset (page - 1) * 10
 * LIMIT 10
 * page 1  off 0
 * page 2  off 10
 * page 3  off 20
 *
 */
