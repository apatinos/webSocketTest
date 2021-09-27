import { DatabaseModule } from '@infrastructure/data/provider/database/database.module';
import { HttpModule, Module } from '@nestjs/common';
import { RoomsController } from '@application/controllers/room.controller';
import { RoomsService } from '@domain/services/room.service';
import { RoomRepository } from '@infrastructure/data/repository/room.repository';
import { AuthController } from '@application/controllers/auth.controller';
import { AuthService } from '@domain/services/auth.service';
import { UserController } from '@application/controllers/user.controller';
import { UserService } from '@domain/services/user.service';
import { UserRepository } from '@infrastructure/data/repository/user.repository';
import { JwtService } from '@infrastructure/data/provider/auth/jwt/jwt.service';
import {
  moveProviders,
  roomProviders,
  userProviders,
} from '@infrastructure/data/model';

@Module({
  imports: [HttpModule, DatabaseModule],
  controllers: [RoomsController, AuthController, UserController],
  providers: [
    JwtService,
    RoomsService,
    UserService,
    AuthService,
    UserRepository,
    RoomRepository,
    ...userProviders,
    ...roomProviders,
    ...moveProviders,
  ],
  exports: [JwtService, RoomsService, UserService],
})
export class AppModule {}
