export interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Platform {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPlatform {
  id: string;
  userId: string;
  platformId: string;
  accountName: string;
  encryptedSecret: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPlatformWithPlatform extends UserPlatform {
  platform: Platform;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
