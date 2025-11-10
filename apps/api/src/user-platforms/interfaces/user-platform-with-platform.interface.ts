import { UserPlatform, Platform } from "../../../generated/prisma";

export interface UserPlatformWithPlatform extends UserPlatform {
  platform: Platform;
}
