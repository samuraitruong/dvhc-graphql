import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Province, District } from '../types';
import { Database } from '../../repository/db';
import { Inject } from 'typedi';
import { DVHCTypes } from '../types/enums';
// import { baseResolver } from './baseResolver';

// const BaseProvineResolver = baseResolver('provine', Province);

@Resolver((of) => Province)
export class ProvinceResolver {
  constructor(@Inject('DB') private db: Database) {}
  @Query((returns) => [Province])
  provinces(
    @Arg('name', { nullable: true }) name: string,
    @Arg('type', (_) => DVHCTypes, { nullable: true }) type: DVHCTypes
  ) {
    return this.db.getItems(null, name, 1, type);
  }

  @Query((returns) => Province)
  province(@Arg('name', { nullable: true }) name: string) {
    return this.db.getItem(null, null, name, 1);
  }
  @FieldResolver(
    (returns) => {
      return [District];
    },
    { nullable: true }
  )
  districts(
    @Root() province: Province,
    @Arg('name', { nullable: true }) name: string,
    @Arg('type', (_) => DVHCTypes, { nullable: true }) type: DVHCTypes
  ) {
    return this.db.getItems(province._id, name, 2, type);
  }
}
