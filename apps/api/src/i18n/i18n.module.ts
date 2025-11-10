import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { I18nService } from "./i18n.service";
import { LanguageMiddleware } from "./language.middleware";

@Module({
  providers: [I18nService],
  exports: [I18nService],
})
export class I18nModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LanguageMiddleware).forRoutes("*");
  }
}
