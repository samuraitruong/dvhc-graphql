import { ObjectType, Field, ID, InterfaceType } from 'type-graphql';
import { BaseItem, Province, Ward } from '.';

@ObjectType()
export class District extends BaseItem {
  @Field((_) => [Ward], { nullable: true })
  wards!: Ward[];

  @Field((_) => Province, { nullable: true })
  province!: Province;
}
