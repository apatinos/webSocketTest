import { User } from '@domain/entities/user';
import { UserRepository } from '@infrastructure/data/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  async create(user: User): Promise<User> {
    return this._userRepository.create(user);
  }

  async findAll(options?: any): Promise<User[]> {
    return this._userRepository.findAll(options);
  }

  async findById(id: string): Promise<User | null> {
    return this._userRepository.findById(id);
  }

  async findOne(options: any, fields?: any): Promise<User | null> {
    return this._userRepository.findOne(options, fields);
  }

  async update(id: number, newValue: User): Promise<User | null> {
    return this._userRepository.update(id, newValue);
  }

  async delete(id: number): Promise<User | null> {
    return this._userRepository.delete(id);
  }
}
