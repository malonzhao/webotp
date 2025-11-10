import {
  Controller,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Patch,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdateUsernameDto } from "./dto/update-username.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetUser } from "../auth/decorators/get-user.decorator";
import type { TokenPayload } from "../auth/interfaces/token-payload.interface";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  async getProfile(@GetUser() user: TokenPayload) {
    const userData = await this.usersService.findById(user.sub);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, refreshToken, ...profileData } = userData;
    return profileData;
  }

  @Patch("password")
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @GetUser() user: TokenPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ message: string }> {
    await this.usersService.updatePassword(user.sub, updatePasswordDto);
    return { message: "Password updated successfully" };
  }

  @Patch("username")
  @HttpCode(HttpStatus.OK)
  async updateUsername(
    @GetUser() user: TokenPayload,
    @Body() updateUsernameDto: UpdateUsernameDto,
  ): Promise<{ message: string }> {
    try {
      await this.usersService.updateUsername(user.sub, updateUsernameDto.username);
      return { message: "Username updated successfully" };
    } catch (error: any) {
      console.error('Username update failed:', error.message);
      throw error;
    }
  }
}
