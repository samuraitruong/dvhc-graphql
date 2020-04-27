import express from 'express';
import { buildSchema } from 'type-graphql';
import expressGraphQL from 'express-graphql';
import { resolvers } from './graphql/resolvers';
import playground from 'graphql-playground-middleware-express';
import { Container } from 'typedi';
import { Database } from './repository/db';
import winston from 'winston';
import { createLogger } from './common/logger';
import expressWinston from 'express-winston';

export class HttpApiServer {
  private app: express.Application;
  private logger: winston.Logger;
  constructor(private db: Database) {
    this.logger = createLogger('server');
    this.app = express();
    this.setupRoutes();
    this.setupLogging();
  }
  private setupLogging() {
    this.app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: (req, res) => {
          return false;
        }, // optional: allows to skip some log messages based on request and/or response
      })
    );
  }
  private async setupRoutes() {
    // Singleton database instance
    Container.set('DB', this.db);

    const schema = await buildSchema({
      resolvers,
      emitSchemaFile: true,
      container: Container,
    });
    this.app.use('/playground', playground({ endpoint: '/graphql' }));
    this.app.use(
      '/graphql',
      expressGraphQL({
        schema,
        graphiql: true,
        customFormatErrorFn: (error: any) => {
          this.logger.error('GraphQL Error', error);
          return error;
        },
      })
    );
  }
  public start(port: number | number) {
    this.app.listen(port, () => {
      this.logger.info('Server running on port: %j', port);
    });
  }
}
