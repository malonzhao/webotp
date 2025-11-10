import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PlatformsModule } from "./platforms/platforms.module";
import { UserPlatformsModule } from "./user-platforms/user-platforms.module";
import { I18nModule } from "./i18n/i18n.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: "short",
          ttl: 1000,
          limit: 5,
        },
        {
          name: "medium",
          ttl: 10000,
          limit: 20,
        },
        {
          name: "long",
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    PlatformsModule,
    UserPlatformsModule,
    I18nModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
