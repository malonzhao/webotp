import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { TokensDto } from "./dto/tokens.dto";
import { Language } from "../i18n/decorators/language.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @Throttle({ default: { ttl: 60000, limit: 5 } }) // 5 attempts per minute
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Language() language: string,
  ): Promise<TokensDto> {
    return this.authService.login(loginDto, language);
  }

  @Post("refresh")
  @Throttle({ default: { ttl: 60000, limit: 10 } }) // 10 attempts per minute
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body() body: { refreshToken: string },
    @Language() language: string,
  ): Promise<TokensDto> {
    return this.authService.refreshToken(body.refreshToken, language);
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: { refreshToken: string }): Promise<void> {
    return this.authService.logout(body.refreshToken);
  }
}
