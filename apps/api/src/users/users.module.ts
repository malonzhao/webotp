import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma.module";
import { I18nModule } from "../i18n/i18n.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [PrismaModule, I18nModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
