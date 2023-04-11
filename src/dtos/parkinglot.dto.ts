import { IsString, MinLength, IsNumber, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { InputType, Field, registerEnumType } from 'type-graphql';
import { ParkingLot } from '@typedefs/parkinglot.type';
import { UserTypeEnum } from './users.dto';


export enum ParkingTypeEnum {
  public = 1,
  private = 2,
  courtesy = 3,
}
export enum ParkingTypeFieldsEnum {
  name,
  spots,
  contact,
  parkingType,
}

export enum SortEnum {
  ASC,
  DESC
}

registerEnumType(ParkingTypeEnum, {
  name: "ParkingTypeEnum",
});

registerEnumType(ParkingTypeFieldsEnum, {
  name: "ParkingTypeFieldsEnum",
});

registerEnumType(SortEnum, {
  name: "SortEnum",
});

@InputType()
export class CreateParkingLotDto implements Partial<ParkingLot> {
  @Field()
  @IsString()
  name?: string;

  @Field()
  @IsString()
  @MinLength(10)
  contact?: string;

  @Field()
  @IsNumber()
  spots?: number;

  @Field(type => ParkingTypeEnum)
  @IsEnum(ParkingTypeEnum)
  parkingType?: 'public' | 'private' | 'courtesy';
}

@InputType()
export class UpdateParkingLotDto implements Partial<ParkingLot> {
  @Field()
  @IsString()
  name?: string;

  @Field()
  @IsString()
  @MinLength(10)
  contact?: string;

  @Field(type => ParkingTypeEnum)
  @IsEnum(ParkingTypeEnum)
  parkingType?: 'public' | 'private' | 'courtesy';
}

@InputType()
export class CheckInParkingLotDto implements Partial<ParkingLot> {
  @Field()
  @IsString()
  @IsUUID()
  id: string;

  @Field(type => UserTypeEnum)
  @IsString()
  @IsEnum(UserTypeEnum)
  userType: 'corporate' | 'provider' | 'visitor';
}

@InputType()
export class SortingParkingLotDto {
  @Field(type => SortEnum, {nullable: true})
  @IsOptional()
  name: 'ASC' | 'DESC';

  @Field(type => SortEnum, {nullable: true})
  @IsOptional()
  spots: 'ASC' | 'DESC';

  @Field(type => SortEnum, {nullable: true})
  @IsOptional()
  contact: 'ASC' | 'DESC';

  @Field(type => SortEnum, {nullable: true})
  @IsOptional()
  parkingType: 'ASC' | 'DESC';

}
