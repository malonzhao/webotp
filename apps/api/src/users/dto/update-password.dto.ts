import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class UpdatePasswordDto {
  @IsString({ message: "Current password must be a string" })
  @IsNotEmpty({ message: "Current password cannot be empty" })
  currentPassword!: string;

  @IsString({ message: "New password must be a string" })
  @IsNotEmpty({ message: "New password cannot be empty" })
  @MinLength(8, {
    message: "New password length cannot be less than 8 characters",
  })
  @MaxLength(100, {
    message: "New password length cannot exceed 100 characters",
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  })
  newPassword!: string;

  @IsString({ message: "Confirm password must be a string" })
  @IsNotEmpty({ message: "Confirm password cannot be empty" })
  confirmPassword!: string;
}
