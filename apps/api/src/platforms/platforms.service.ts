import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { PlatformsRepository } from "./platforms.repository";
import { CreatePlatformDto } from "./dto/create-platform.dto";
import { Platform } from '../../generated/prisma';
import { I18nService } from "../i18n/i18n.service";

@Injectable()
export class PlatformsService {
  constructor(
    private readonly platformsRepository: PlatformsRepository,
    private readonly i18nService: I18nService,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ platforms: Platform[]; total: number }> {
    const skip = (page - 1) * limit;
    const [platforms, total] = await Promise.all([
      this.platformsRepository.findAll(),
      this.platformsRepository.count(),
    ]);

    return {
      platforms: platforms.slice(skip, skip + limit),
      total,
    };
  }

  async findById(id: string): Promise<Platform> {
    const platform = await this.platformsRepository.findById(id);
    if (!platform) {
      throw new NotFoundException(
        this.i18nService.translate("platforms.not_found"),
      );
    }
    return platform;
  }

  async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
    const existingPlatform = await this.platformsRepository.findByName(
      createPlatformDto.name,
    );
    if (existingPlatform) {
      throw new ConflictException(
        this.i18nService.translate("platforms.already_exists"),
      );
    }

    return this.platformsRepository.create({
      name: createPlatformDto.name,
    });
  }

  async update(
    id: string,
    updateData: Partial<CreatePlatformDto>,
  ): Promise<Platform> {
    const platform = await this.findById(id);

    if (updateData.name && updateData.name !== platform.name) {
      const existingPlatform = await this.platformsRepository.findByName(
        updateData.name,
      );
      if (existingPlatform) {
        throw new ConflictException(
          this.i18nService.translate("platforms.already_exists"),
        );
      }
    }

    return this.platformsRepository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.platformsRepository.delete(id);
  }
}
