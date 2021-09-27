import { CreateUserDto } from '@application/dto/CreateUser.dto';
import { USER_MODEL_PROVIDER } from '@constants';
import { User } from '@domain/entities/user';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { mongooseUserModel, UserModel } from '../model/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_MODEL_PROVIDER) private readonly userModel: UserModel,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser: User = new UserModel(createUserDto);
      await mongooseUserModel.create(createdUser, function (error) {
        if (error) throw new BadRequestException(error.message);
      });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(options?: any): Promise<User[]> {
    try {
      return await mongooseUserModel.find(options).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return await mongooseUserModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(options: any, fields?: any): Promise<User | null> {
    try {
      return await mongooseUserModel.findOne(options, fields).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, newValue: User): Promise<User | null> {
    try {
      return await mongooseUserModel.findByIdAndUpdate(id, newValue).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<User | null> {
    try {
      return await mongooseUserModel.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
