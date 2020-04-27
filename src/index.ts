import 'reflect-metadata';
import { HttpApiServer } from './server';
import { Database } from './repository/db';
import { CONSTANST } from './common/constants';
(async () => {
  const db = new Database(CONSTANST.CONNECTION_STRING, CONSTANST.DB_NAME);
  await db.connect();
  const app = new HttpApiServer(db);
  app.start(CONSTANST.PORT);
})();
