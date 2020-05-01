import 'reflect-metadata';
import { HttpApiServer } from './server';
import { Database } from './repository/db';
import { CONSTANST } from './common/constants';
import { Container } from 'typedi';
(async () => {
  const db = new Database(CONSTANST.CONNECTION_STRING, CONSTANST.DB_NAME);

  Container.set('DB', db);
  await db.connect();
  const app = new HttpApiServer(db);
  app.start(CONSTANST.PORT);
})();
