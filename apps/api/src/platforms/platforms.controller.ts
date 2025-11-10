import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { PlatformsService } from "./platforms.service";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("platforms")
@UseGuards(JwtAuthGuard)
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @Get()
  async findAll(
    @Query("page") page: string = "1",
    @Query("limit") limit: string = "10",
  ) {
    return this.platformsService.findAll(parseInt(page), parseInt(limit));
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.platformsService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPlatformDto: CreatePlatformDto) {
    return this.platformsService.create(createPlatformDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateData: Partial<CreatePlatformDto>,
  ) {
    return this.platformsService.update(id, updateData);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    return this.platformsService.delete(id);
  }
}
