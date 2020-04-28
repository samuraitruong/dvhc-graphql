import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Province, District } from '../types';
import { Database } from '../../repository/db';
import { Inject } from 'typedi';
// import { baseResolver } from './baseResolver';

// const BaseProvineResolver = baseResolver('provine', Province);

@Resolver((of) => Province)
export class ProvinceResolver {
  constructor(@Inject('DB') private db: Database) {}
  @Query((returns) => [Province])
  provinces(@Arg('name', { nullable: true }) name: string) {
    return this.db.getProvines(name);
  }

  @Query((returns) => Province)
  province(@Arg('name', { nullable: true }) name: string) {
    return this.db.getProvine(name);
  }
  @FieldResolver(
    (returns) => {
      return [District];
    },
    { nullable: true }
  )
  districts(
    @Root() province: Province,
    @Arg('name', { nullable: true }) name: string
  ) {
    return this.db.getItems(province._id, name);
  }
}
