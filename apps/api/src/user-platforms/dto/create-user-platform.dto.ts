import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserPlatformDto {
  @IsString({ message: "Platform ID must be a string" })
  @IsNotEmpty({ message: "Platform ID cannot be empty" })
  platformId!: string;

  @IsString({ message: "Account name must be a string" })
  @IsNotEmpty({ message: "Account name cannot be empty" })
  accountName!: string;

  @IsString({ message: "OTP secret must be a string" })
  @IsNotEmpty({ message: "OTP secret cannot be empty" })
  secret!: string;
}
