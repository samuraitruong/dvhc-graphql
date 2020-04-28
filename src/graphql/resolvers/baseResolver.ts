import { BaseItem, Province } from '../types';
import { Resolver, Query, Arg, Int } from 'type-graphql';
import { Inject } from 'typedi';
import { Database } from '../../repository/db';

export function baseResolver<T extends BaseItem>(
  suffix: string,
  objectTypeCls: T
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    constructor(@Inject('DB') private db: Database) {}
    @Query((returns) => [objectTypeCls], { name: `${suffix}` })
    items(@Arg('name', { nullable: true }) name: string) {
      return this.db.getItems(name);
    }
  }

  return BaseResolver;
}
