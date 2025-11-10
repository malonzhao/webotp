import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { I18nService } from "./i18n.service";

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  constructor(private readonly i18nService: I18nService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    // Get language from Accept-Language header
    const acceptLanguage = req.headers["accept-language"];
    let language = "en"; // default language

    if (acceptLanguage) {
      // Parse Accept-Language header and get the first supported language
      const languages = acceptLanguage.split(",").map((lang) => {
        const [code, quality] = lang.trim().split(";");
        return {
          code: code, // Keep full language code (e.g., 'zh-CN')
          baseCode: code.split("-")[0], // Get base language code (e.g., 'zh' from 'zh-CN')
          quality: quality ? parseFloat(quality.split("=")[1]) : 1.0,
        };
      });

      // Sort by quality and find first supported language
      languages.sort((a, b) => b.quality - a.quality);

      const supportedLanguages = this.i18nService.getSupportedLanguages();

      // First try to match full language code (e.g., 'zh-CN')
      for (const lang of languages) {
        if (supportedLanguages.includes(lang.code)) {
          language = lang.code;
          break;
        }
      }

      // If no full match, try to match base language code (e.g., 'zh')
      if (language === "en") {
        for (const lang of languages) {
          if (supportedLanguages.includes(lang.baseCode)) {
            language = lang.baseCode;
            break;
          }
        }
      }
    }

    // Set language in request object for later use
    (req as any).language = language;
    next();
  }
}
