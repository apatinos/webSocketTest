import { CreateRoomDto } from '@application/dto/CreateRoom.dto';
import { Move } from '@domain/entities/moves';
import { User } from '@domain/entities/user';
import { model, Schema, Document } from 'mongoose';
import { MoveSchema } from './move.model';
import { UserSchema } from './user.model';

export class RoomModel {
  name: string;
  description?: string;
  is_user: boolean;
  is_private: boolean;
  moves?: Move[];
  users?: User[];
  created_at: Date;
  updated_at: Date;

  constructor(createRegisterDto: CreateRoomDto) {
    this.name = createRegisterDto.name;
    this.description = createRegisterDto.description;
    this.is_user = createRegisterDto.is_user;
    this.is_private = createRegisterDto.is_private;
    this.moves = createRegisterDto.moves;
    this.users = createRegisterDto.users;
    this.created_at = createRegisterDto.created_at;
    this.updated_at = createRegisterDto.updated_at;
  }

  save(): RoomModel {
    return this;
  }
}

export const RoomSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  is_user: { type: Boolean, default: false },
  is_private: { type: Boolean, default: false },
  users: [UserSchema],
  moves: [MoveSchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// register each method at schema
RoomSchema.method('foo', RoomModel.prototype.save);

// 2) Document
export type MoveDocument = RoomModel & Document;

// 3) MODEL
export const mongooseRoomModel = model<MoveDocument>('Room', RoomSchema);
