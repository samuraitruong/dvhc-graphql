import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Province, District, Ward } from '../types';
import { Database } from '../../repository/db';
import { Inject } from 'typedi';
// import { baseResolver } from './baseResolver';

// const BaseProvineResolver = baseResolver('provine', Province);

@Resolver((of) => Ward)
export class WardResolver {
  constructor(@Inject('DB') private db: Database) {}
  @Query((returns) => [Ward])
  wards(@Arg('name', { nullable: true }) name: string) {
    return this.db.getItems(null, name, 3);
  }

  @Query((returns) => Ward)
  ward(@Arg('name', { nullable: true }) name: string) {
    return this.db.getItem(null, null, name, 3);
  }

  @FieldResolver(
    (returns) => {
      return Province;
    },
    { nullable: true }
  )
  district(@Root() item: District) {
    return this.db.getItem(item.parent_id);
  }

  @FieldResolver(
    (returns) => {
      return Province;
    },
    { nullable: true }
  )
  async province(@Root() item: Ward) {
    const district1 = await this.db.getItem(item.parent_id);
    return this.db.getItem(district1.parent_id);
  }
}
