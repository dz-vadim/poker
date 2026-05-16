import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { RoomDto } from "./dto/room.dto";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get("/")
  async getAll(
    @Query("limit") limit: number = 100,
    @Query("page") page: number = 0,
    @Query("isActive") isActive: boolean = true,
  ): Promise<RoomDto[]> {
    return this.roomsService.getAll(limit, page, isActive);
  }

  @Get(":roomId")
  async getById(@Param("roomId") roomId: number) {}

  @Post("/")
  async create(@Body() room: any) {}

  @Delete(":roomId")
  async deleteById(@Param("roomId") roomId: number) {}

  @Patch("/")
  async update(@Body() room: any) {}
}
