import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenderEnum, UserRoleEnum } from 'src/user/user.enum';

@InputType()
export class RegisterInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(30)
  @Field()
  lastName: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  bio?: string;

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsMobilePhone(null, null, {
    message: 'Must be mobile phone',
  })
  @IsNotEmpty()
  @Field()
  phone: string;

  @Field()
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  password: string;

  @Field()
  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;

  @IsOptional()
  @Field()
  gender: GenderEnum;

  // @Field({ nullable: true })
  // @IsString()
  // @IsOptional()
  // fcmToken?: string;

  // @Field((type) => DeviceEnum)
  // @IsEnum(DeviceEnum)
  // @IsNotEmpty()
  // device: DeviceEnum;
}
