import { Field, ObjectType } from 'type-graphql';

export type UserType = 'corporate' | 'provider' | 'visitor'


@ObjectType()
export class User {
  @Field()
  id?: string;

  @Field()
  email?: string;

  @Field()
  password: string;

  @Field()
  type: UserType;
}
