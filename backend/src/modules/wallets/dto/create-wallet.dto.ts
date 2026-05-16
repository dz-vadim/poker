import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateWalletDto {
  @ApiProperty({
    example: 1,
    description: "User ID for wallet owner",
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: 100,
    description: "Whole currency units",
  })
  @IsInt()
  @Min(0)
  units: number;

  @ApiProperty({
    example: 50,
    description: "Cents part of balance",
  })
  @IsInt()
  @Min(0)
  cents: number;
}
