import * as mongoose from 'mongoose';
import { DB_PROVIDER, DEFAULT_DB_CONNECTION, MONGO_HOSTNAME } from '@constants';
import { getConnectionToken } from '@nestjs/mongoose';

export const databaseProviders = [
  {
    provide: DB_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      mongoose.connect(MONGO_HOSTNAME, {
        useNewUrlParser: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
  },
  {
    provide: getConnectionToken(DEFAULT_DB_CONNECTION),
    useValue: {},
  },
];

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
