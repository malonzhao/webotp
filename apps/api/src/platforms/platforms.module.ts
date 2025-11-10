import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma.module";
import { I18nModule } from "../i18n/i18n.module";
import { PlatformsController } from "./platforms.controller";
import { PlatformsService } from "./platforms.service";
import { PlatformsRepository } from "./platforms.repository";

@Module({
  imports: [PrismaModule, I18nModule],
  controllers: [PlatformsController],
  providers: [PlatformsService, PlatformsRepository],
  exports: [PlatformsService],
})
export class PlatformsModule {}
