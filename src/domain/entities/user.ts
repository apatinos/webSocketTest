import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly username?: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly admin?: boolean;

  @IsDate()
  @IsNotEmpty()
  readonly created_at: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updated_at: Date;
}
