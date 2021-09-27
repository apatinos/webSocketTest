import {
  DB_PROVIDER,
  MOVE_MODEL_PROVIDER,
  ROOM_MODEL_PROVIDER,
  USER_MODEL_PROVIDER,
} from '@constants';
import { MoveModel } from './move.model';
import { RoomModel } from './room.model';
import { UserModel } from './user.model';

export const userProviders = [
  {
    provide: USER_MODEL_PROVIDER,
    useValue: UserModel,
    inject: [DB_PROVIDER],
  },
];

export const roomProviders = [
  {
    provide: ROOM_MODEL_PROVIDER,
    useValue: RoomModel,
    inject: [DB_PROVIDER],
  },
];

export const moveProviders = [
  {
    provide: MOVE_MODEL_PROVIDER,
    useValue: MoveModel,
    inject: [DB_PROVIDER],
  },
];
