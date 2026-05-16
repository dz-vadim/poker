import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class RoomDto {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  minBlind: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsInt()
  activePlayers: number;
}
