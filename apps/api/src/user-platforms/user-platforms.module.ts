import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma.module";
import { I18nModule } from "../i18n/i18n.module";
import { UserPlatformsController } from "./user-platforms.controller";
import { UserPlatformsService } from "./user-platforms.service";
import { UserPlatformsRepository } from "./user-platforms.repository";

@Module({
  imports: [PrismaModule, I18nModule],
  controllers: [UserPlatformsController],
  providers: [UserPlatformsService, UserPlatformsRepository],
  exports: [UserPlatformsService],
})
export class UserPlatformsModule {}
