import { MongoClient, Collection, Db, ObjectID, ObjectId } from 'mongodb';
import winston from 'winston';
import { Service } from 'typedi';
import { createLogger } from '../common/logger';
/**
 * Create and manage connection string to mongo database
 */
@Service()
export class Database {
  private client: MongoClient;
  private collection: Collection | undefined;
  private db: Db | undefined;
  private logger: winston.Logger;
  constructor(connectionString: string, private databaseName: string) {
    this.client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.logger = createLogger('db');
  }

  public async connect() {
    await this.client.connect();
    this.db = this.client.db(this.databaseName);
    this.collection = this.db.collection('items');

    this.logger.info('Successul connect to database');
  }
  public async getItem(
    id?: string,
    parentId?: string,
    name?: string,
    level?: number
  ) {
    if (!this.collection) {
      throw new Error('Database not initialized');
    }

    const filter: any = {};
    if (id) {
      filter._id = new ObjectId(id);
    }
    if (parentId) {
      filter.parent_id = parentId;
    }
    if (name) {
      filter.name = new RegExp(name, 'i');
    }
    if (level) {
      filter.level = level;
    }
    return await this.collection.findOne(filter);
  }

  public async getItems(
    parentId?: string,
    name?: string,
    level?: number,
    type?: string
  ) {
    if (!this.collection) {
      throw new Error('Database not initialized');
    }

    try {
      const filter: any = {
        // parent_id: parentId || null,
      };
      if (parentId) {
        filter.parent_id = parentId;
      }
      if (name) {
        filter.name = new RegExp(name, 'i');
      }
      if (type) {
        filter.type = new RegExp(type, 'i');
      }
      if (level) {
        filter.level = level;
      }

      return this.collection.find(filter, { sort: { name: 1 } }).toArray();
    } catch (err) {
      this.logger.error('Database query error', err);
    }
  }
}
