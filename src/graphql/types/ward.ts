import { ObjectType, Field, ID, InterfaceType } from 'type-graphql';
import { BaseItem, District, Province } from '.';

@ObjectType()
export class Ward extends BaseItem {
  @Field((_) => District, { nullable: true })
  district!: District;

  @Field((_) => Province, { nullable: true })
  province!: Province;
}
