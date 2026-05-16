import { BadRequestException, Body, Controller, Get, Headers, Post, UnauthorizedException } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RegistrationDto } from "./dto/registration.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  async register(@Body() createUserDto: RegistrationDto) {
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("auth")
  @ApiOperation({ summary: "Login user" })
  async auth(@Body() authDto: AuthDto) {
    try {
      return await this.authService.auth(authDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("verify")
  @ApiOperation({ summary: "Verify JWT token" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        token: { type: "string", example: "jwt_token_here" },
      },
    },
  })
  verify(@Body("token") token: string): any {
    try {
      return this.authService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        refreshToken: { type: "string", example: "refresh_token_here" },
      },
    },
  })
  refresh(@Body("refreshToken") refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Get("me")
  @ApiOperation({ summary: "Get current user by Bearer token" })
  @ApiBearerAuth()
  me(@Headers("authorization") authorization?: string) {
    const authHeader = String(authorization ?? "");
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : "";

    if (!token) {
      throw new UnauthorizedException("Missing Bearer token");
    }

    return this.authService.me(token);
  }
}
