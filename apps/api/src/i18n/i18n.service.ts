import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

interface TranslationData {
  [key: string]: string | TranslationData;
}

@Injectable()
export class I18nService {
  private translations: { [language: string]: TranslationData } = {};
  private defaultLanguage = "en";

  constructor() {
    this.loadTranslations();
  }

  private loadTranslations() {
    // Try multiple possible paths for locales
    const possiblePaths = [
      path.join(__dirname, "locales"), // Development path
      path.join(process.cwd(), "dist", "src", "i18n", "locales"), // Production path
      path.join(process.cwd(), "src", "i18n", "locales"), // Alternative development path
    ];

    for (const localesPath of possiblePaths) {
      try {
        if (fs.existsSync(localesPath)) {
          const files = fs.readdirSync(localesPath);

          for (const file of files) {
            if (file.endsWith(".json")) {
              const language = file.replace(".json", "");
              const filePath = path.join(localesPath, file);
              const content = fs.readFileSync(filePath, "utf8");
              this.translations[language] = JSON.parse(content);
            }
          }
          return; // Successfully loaded translations
        }
      } catch (error) {
        console.warn(`Failed to load translations from ${localesPath}:`, error);
      }
    }

    // If no translations loaded, fail gracefully
    console.error("No translation files found in any of the expected locations");
  }



  translate(key: string, language?: string): string {
    const lang = language || this.defaultLanguage;
    const keys = key.split(".");

    let value: any =
      this.translations[lang] || this.translations[this.defaultLanguage];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to default language
        value = this.translations[this.defaultLanguage];
        for (const k2 of keys) {
          if (value && typeof value === "object" && k2 in value) {
            value = value[k2];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  }

  getSupportedLanguages(): string[] {
    return Object.keys(this.translations);
  }

  setDefaultLanguage(language: string) {
    if (this.translations[language]) {
      this.defaultLanguage = language;
    }
  }
}
