import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({
    example: "Beginner Texas Holdem",
    description: "Room name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 10,
    description: "Minimum blind for the room",
  })
  @IsInt()
  @Min(1)
  minBlind: number;

  @ApiProperty({
    example: 1,
    description: "Creator user ID",
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: true,
    description: "Whether room is active",
    required: false,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
