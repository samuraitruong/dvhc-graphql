import { Resolver, Query, Arg, FieldResolver, Root } from 'type-graphql';
import { Province, District, Ward } from '../types';
import { Database } from '../../repository/db';
import { Inject } from 'typedi';
// import { baseResolver } from './baseResolver';

// const BaseProvineResolver = baseResolver('provine', Province);

@Resolver((of) => District)
export class DistrictResolver {
  constructor(@Inject('DB') private db: Database) {}
  @Query((returns) => [District])
  districts(@Arg('name', { nullable: true }) name: string) {
    return this.db.getDistricts(name);
  }

  @Query((returns) => District)
  district(@Arg('name', { nullable: true }) name: string) {
    return this.db.getDistrict(name);
  }

  @FieldResolver(
    (returns) => {
      return Province;
    },
    { nullable: true }
  )
  province(@Root() district: District) {
    return this.db.getItem(district.parent_id);
  }

  @FieldResolver(
    (returns) => {
      return [Ward];
    },
    { nullable: true }
  )
  wards(@Root() district: District) {
    return this.db.getItems(district._id);
  }
}
