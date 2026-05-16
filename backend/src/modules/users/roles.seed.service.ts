import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { UserRole } from "./enums/user-roles.enum";

@Injectable()
export class RolesSeedService implements OnModuleInit {
  private readonly logger = new Logger(RolesSeedService.name);

  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async onModuleInit(): Promise<void> {
    const desiredRoles: Array<Pick<Role, "id" | "name">> = [
      { id: UserRole.USER, name: "USER" },
      { id: UserRole.ADMIN, name: "ADMIN" },
      { id: UserRole.SUPER_ADMIN, name: "SUPER_ADMIN" },
    ];

    const existing = await this.roleRepository.find({
      where: { id: In(desiredRoles.map((r) => r.id)) },
      select: { id: true, name: true },
    });

    const existingIds = new Set(existing.map((r) => r.id));
    const toInsert = desiredRoles.filter((r) => !existingIds.has(r.id));

    if (toInsert.length === 0) return;

    await this.roleRepository.insert(toInsert);
    this.logger.log(`Seeded roles: ${toInsert.map((r) => r.name).join(", ")}`);
  }
}

