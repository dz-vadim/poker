import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { CreateRoomDto } from "./create-room.dto";

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiPropertyOptional({
    example: 1,
    description: "Room ID",
  })
  id?: number;

  @ApiPropertyOptional({
    example: "VIP Poker Room",
    description: "Room name",
  })
  name?: string;

  @ApiPropertyOptional({
    example: 25,
    description: "Minimum blind",
  })
  minBlind?: number;

  @ApiPropertyOptional({
    example: true,
    description: "Room active status",
  })
  isActive?: boolean;
}
