import { CreateUserDto } from '@application/dto/CreateUser.dto';
import { model, Schema, Document } from 'mongoose';
import * as faker from 'faker';
export class UserModel {
  _id: string;
  name: string;
  email: string;
  password: string;
  username?: string;
  admin?: boolean;
  created_at: Date;
  updated_at: Date;

  constructor(createRegisterDto: CreateUserDto) {
    this._id = faker.random.uuid();
    this.name = createRegisterDto.name;
    this.email = createRegisterDto.email;
    this.password = createRegisterDto.password;
    this.username = createRegisterDto.username;
    this.created_at = createRegisterDto.created_at;
    this.updated_at = createRegisterDto.updated_at;
  }

  save(): UserModel {
    return this;
  }
}

export const UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  admin: Boolean,
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// register each method at schema
UserSchema.method('foo', UserModel.prototype.save);

// 2) Document
export type MoveDocument = UserModel & Document;

// 3) MODEL
export const mongooseUserModel = model<MoveDocument>('User', UserSchema);
