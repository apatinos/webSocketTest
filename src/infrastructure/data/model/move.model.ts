import { CreateMoveDto } from '@application/dto/CreateMove.dto';
import { model, Schema, Document } from 'mongoose';

export class MoveModel {
  moves: Array<string>;
  user: string;
  date: Date;

  constructor(createRegisterDto: CreateMoveDto) {
    this.moves = createRegisterDto.moves;
    this.user = createRegisterDto.user;
    this.date = createRegisterDto.date;
  }

  save(): MoveModel {
    return this;
  }
}

export const MoveSchema = new Schema({
  message: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
});

// register each method at schema
MoveSchema.method('foo', MoveModel.prototype.save);

// 2) Document
export type MoveDocument = MoveModel & Document;

// 3) MODEL
export const mongooseMoveModel = model<MoveDocument>('Move', MoveSchema);
