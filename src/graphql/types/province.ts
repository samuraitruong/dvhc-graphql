import { ObjectType, Field, ID, InterfaceType } from 'type-graphql';
import { BaseItem, District } from '.';

@ObjectType()
export class Province extends BaseItem {
  @Field((_) => [District], { nullable: true })
  districts!: District[];
}
