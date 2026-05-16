import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
  @ApiProperty({
    example: "test@example.com",
    description: "User email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "12345678",
    description: "User password",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
