import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class UpdateUsernameDto {
  @IsString({ message: "Username must be a string" })
  @IsNotEmpty({ message: "Username cannot be empty" })
  @MinLength(3, { message: "Username length cannot be less than 3 characters" })
  @MaxLength(20, { message: "Username length cannot exceed 20 characters" })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  })
  username!: string;
}
