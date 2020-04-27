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
  public async getProvines(name: string = '') {
    return this.getItems(null, name, 1);
  }
  public async getDistricts(name: string = '') {
    return this.getItems(null, name, 2);
  }

  public async getDistrict(name: string = '') {
    return this.getItem(null, null, name, 2);
  }

  public async getProvine(name: string = '') {
    if (!this.collection) {
      throw new Error('Database not initialized');
    }

    try {
      const filter: any = {
        parent_id: null,
      };
      if (name) {
        filter.name = new RegExp(name, 'i');
      }
      return this.collection.findOne(filter);
    } catch (err) {
      this.logger.error('Database query error', err);
    }
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

    const filter: any = {
      // parent_id: parentId || null,
    };
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
  public async getItems(parentId?: string, name?: string, level?: number) {
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
      if (level) {
        filter.level = level;
      }

      return this.collection.find(filter).toArray();
    } catch (err) {
      this.logger.error('Database query error', err);
    }
  }
}
