import { CreateRoomDto } from '@application/dto/CreateRoom.dto';
import { ROOM_MODEL_PROVIDER } from '@constants';
import { Move } from '@domain/entities/moves';
import { Room } from '@domain/entities/room';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { mongooseRoomModel, RoomModel } from '../model/room.model';

@Injectable()
export class RoomRepository {
  constructor(
    @Inject(ROOM_MODEL_PROVIDER) private readonly roomModel: RoomModel,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      const newRoom: Room = new RoomModel(createRoomDto);
      await mongooseRoomModel.create(newRoom, function (error) {
        if (error) throw new BadRequestException(error.message);
      });
      return newRoom;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addMove(move: Move, id: string) {
    try {
      const room = await this.findById(id);
      room.moves.push(move);
      return await mongooseRoomModel.updateOne({ _id: id }, room, {}, (err) => {
        if (err) throw new BadRequestException(err.message);
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMoves(id: string, limit: number) {
    try {
      let findedRoom = await this.findWithLimit(id, limit);

      // Create the user room, if isn't already exist
      if (!findedRoom) {
        const userRoom: Room = new RoomModel({
          name: id,
          is_user: true,
          is_private: false,
          created_at: new Date(),
          updated_at: new Date(),
        });
        findedRoom = await this.create(userRoom);
      }

      return findedRoom.moves;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(options?: any): Promise<Room[]> {
    try {
      return await mongooseRoomModel.find(options).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findWithLimit(id: string, limit: number): Promise<Room | null> {
    try {
      return await mongooseRoomModel.findById(id).slice('moves', limit).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<Room | null> {
    try {
      return await mongooseRoomModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(options?: any, fields?: any): Promise<Room | null> {
    try {
      return await mongooseRoomModel.findOne(options, fields).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, newValue: Room): Promise<Room | null> {
    try {
      return await mongooseRoomModel.findByIdAndUpdate(id, newValue).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<Room | null> {
    try {
      return await mongooseRoomModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
