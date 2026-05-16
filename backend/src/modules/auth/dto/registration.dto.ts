import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegistrationDto {
  @ApiProperty({
    example: "Ivan",
    description: "User first name",
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Petrenko",
    description: "User surname",
  })
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    example: "ivan.petrenko@example.com",
    description: "User email",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "12345678",
    description: "User password",
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: "12345678",
    description: "Password confirmation",
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  repeatPassword: string;
}
