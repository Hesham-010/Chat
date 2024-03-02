import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { DeviceType } from '../notification_status.enum';

@InputType()
export class Notification_TokenInput {
  @Field()
  @IsUUID()
  userId: string;

  @IsString()
  @Field()
  fcm_Token: string;

  @IsEnum(DeviceType)
  @Field()
  deviceType: DeviceType;
}
