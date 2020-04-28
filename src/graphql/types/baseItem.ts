import { ObjectType, Field, ID, InterfaceType } from 'type-graphql';

@ObjectType()
export class BaseItem {
  @Field((type) => ID, { name: 'id' })
  _id!: string;

  @Field({ nullable: true })
  name!: string;

  @Field()
  code!: string;

  @Field()
  type!: string;
  @Field((type) => String, { name: 'fullname' })
  fullname() {
    return `${this.type} ${this.name}`;
  }
  // tslint:disable-next-line: variable-name
  parent_id!: string;
}
