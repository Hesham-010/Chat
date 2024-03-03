import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Min } from 'class-validator';
import { DeviceType } from 'src/notification/notification_status.enum';

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Min(6)
  @IsString()
  @Field()
  password: string;

  @IsNotEmpty()
  @IsEnum(DeviceType)
  @Field()
  deviceType: DeviceType;

  @IsNotEmpty()
  @IsString()
  @Field()
  fcm_Token: string;
}
