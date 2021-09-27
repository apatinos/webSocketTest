import { Move } from '@domain/entities/moves';
import { Room } from '@domain/entities/room';
import { RoomRepository } from '@infrastructure/data/repository/room.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  constructor(private _roomRepository: RoomRepository) {}

  async create(room: Room): Promise<Room> {
    return await this._roomRepository.create(room);
  }

  async addMove(move: Move, id: string) {
    return await this._roomRepository.addMove(move, id);
  }

  async findMoves(id: string, limit: number) {
    return await this._roomRepository.findMoves(id, limit);
  }

  async findAll(options?: any): Promise<Room[]> {
    return await this._roomRepository.findAll(options);
  }

  async findWithLimit(id: string, limit: number): Promise<Room | null> {
    return await this._roomRepository.findWithLimit(id, limit);
  }

  async findById(id: string): Promise<Room | null> {
    return await this._roomRepository.findById(id);
  }

  async findOne(options?: any, fields?: any): Promise<Room | null> {
    return await this._roomRepository.findOne(options, fields);
  }

  async update(id: string, newValue: Room): Promise<Room | null> {
    return await this._roomRepository.findOne(id, newValue);
  }

  async delete(id: string): Promise<Room | null> {
    return await this._roomRepository.findOne(id);
  }
}
