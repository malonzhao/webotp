import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from '../../generated/prisma';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: {
    username: string;
    password: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
