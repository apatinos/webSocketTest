import { User } from '@domain/entities/user';
import { IsArray, IsDate, IsNotEmpty, IsObject } from 'class-validator';

export class CreateMoveDto {
  @IsArray()
  @IsNotEmpty()
  moves: Array<string>;

  @IsObject()
  @IsNotEmpty()
  user: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
