import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegistrationDto } from "./dto/registration.dto";
import { PasswordDoNotMatchError } from "./errors/error";
import bcrypt from "bcrypt";
import { UserRole } from "../users/enums/user-roles.enum";
import { AuthDto } from "./dto/auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Role } from "../users/entities/role.entity";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: RegistrationDto) {
    if (createUserDto.password !== createUserDto.repeatPassword) {
      throw new PasswordDoNotMatchError();
    }

    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword: string = bcrypt.hashSync(createUserDto.password, 10);

    const userRole = await this.roleRepository.findOneBy({
      id: UserRole.USER,
    });
    if (!userRole) {
      throw new Error("Roles does not exist");
    }

    const createdUser = this.userRepository.create({
      name: createUserDto.name,
      surname: createUserDto.surname,
      password: hashedPassword,
      email: createUserDto.email,
      roles: [userRole],
    });
    const newUser = await this.userRepository.save(createdUser);

    if (!newUser) {
      throw new Error("Something went wrong");
    }

    const payload = { userId: newUser.id, email: newUser.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "2h" });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "14d" });

    return {
      accessToken,
      refreshToken,
    };
  }

  async auth(authDto: AuthDto) {
    const user: User | null = await this.userRepository.findOneBy({ email: authDto.email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordIsMatched = await bcrypt.compare(authDto.password, user.password);
    if (!passwordIsMatched) {
      throw new Error("Invalid email or password");
    }

    const payload = { userId: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "2h" });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: "7d" });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload: any = await this.jwtService.verifyAsync(refreshToken);
      const newAccessToken = this.jwtService.sign(
        { userId: payload.userId, email: payload.email },
        { expiresIn: "2h" },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  verify(token: string): any {
    return this.jwtService.verify(token);
  }

  async me(accessToken: string): Promise<Omit<User, "password">> {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken);
      const user = await this.userRepository.findOne({
        where: { id: payload.userId },
        relations: { roles: true },
      });
      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
