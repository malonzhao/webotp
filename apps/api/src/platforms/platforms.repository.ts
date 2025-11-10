import { Injectable } from "@nestjs/common";
import { Platform } from '../../generated/prisma';
import { PrismaService } from "../prisma.service";

@Injectable()
export class PlatformsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Platform[]> {
    return this.prisma.platform.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Platform | null> {
    return this.prisma.platform.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Platform | null> {
    return this.prisma.platform.findUnique({
      where: { name },
    });
  }

  async create(data: { name: string }): Promise<Platform> {
    return this.prisma.platform.create({
      data: {
        name: data.name,
      },
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
    },
  ): Promise<Platform> {
    return this.prisma.platform.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Platform> {
    return this.prisma.platform.delete({
      where: { id },
    });
  }

  async count(): Promise<number> {
    return this.prisma.platform.count();
  }
}
