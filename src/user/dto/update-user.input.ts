import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  IsEnum,
  IsMobilePhone,
} from 'class-validator';
import { GenderEnum } from '../user.enum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @Length(3, 8)
  @IsString()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @Length(3, 16)
  @IsString()
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  @Field({ nullable: true })
  gender?: GenderEnum;

  @IsOptional()
  @IsMobilePhone()
  @Field({ nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  bio?: string;
}
