import { Field, ObjectType } from 'type-graphql';

export type ParkingType = 'public' | 'private' | 'courtesy'

@ObjectType()
export class ParkingLot {
  @Field()
  id?: string;

  @Field()
  name?: string;

  @Field()
  contact: string;

  @Field()
  spots: number;

  @Field()
  parkingType: ParkingType;
}
