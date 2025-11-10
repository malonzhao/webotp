import { IsNotEmpty, IsString } from "class-validator";

export class CreatePlatformDto {
  @IsString({ message: "Platform name must be a string" })
  @IsNotEmpty({ message: "Platform name cannot be empty" })
  name!: string;
}
