import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { WalletsService } from "./wallets.service";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";

@ApiTags("Wallets")
@Controller("wallets")
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: "Create wallet" })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all wallets" })
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get wallet by id" })
  @ApiParam({ name: "id", example: 1 })
  findOne(@Param("id") id: string) {
    return this.walletsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update wallet by id" })
  @ApiParam({ name: "id", example: 1 })
  update(@Param("id") id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete wallet by id" })
  @ApiParam({ name: "id", example: 1 })
  remove(@Param("id") id: string) {
    return this.walletsService.remove(+id);
  }
}
