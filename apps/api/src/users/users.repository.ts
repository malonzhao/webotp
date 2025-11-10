import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { User } from "../../generated/prisma";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async update(
    id: string,
    data: {
      username?: string;
      password?: string;
      isActive?: boolean;
    },
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
