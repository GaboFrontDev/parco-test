import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { User } from '@typedefs/users.type';
import { registerEnumType } from "type-graphql";

export enum UserTypeEnum {
  pcorporateublic = 1,
  provider = 2,
  visitor = 3,
}

registerEnumType(UserTypeEnum, {
  name: "UserTypeEnum", // this one is mandatory
});


@InputType()
export class CreateUserDto implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string;

  @Field(type => UserTypeEnum)
  @IsEnum(UserTypeEnum)
  @IsNotEmpty()
  type: 'corporate' | 'provider' | 'visitor';
}

@InputType()
export class UpdateUserDto implements Partial<User> {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string;
  
  @Field(type => UserTypeEnum)
  @IsEnum(UserTypeEnum)
  @IsNotEmpty()
  type: 'corporate' | 'provider' | 'visitor';
}

@InputType()
export class LoginUserDto implements Partial<User> {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  password: string;
  
  @Field()
  @IsEmail()
  email: string;
}
