import { Move } from '@domain/entities/moves';
import { User } from '@domain/entities/user';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsBoolean()
  @IsNotEmpty()
  is_user: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_private: boolean;

  @IsArray()
  @IsNotEmpty()
  moves?: Move[];

  @IsArray()
  @IsNotEmpty()
  users?: User[];

  @IsDate()
  @IsNotEmpty()
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  updated_at: Date;
}
