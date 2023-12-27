import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SendMessageInput {
  @IsString()
  @Field()
  content: string;

  @IsString()
  @Field()
  receiverId: string;

  @IsString()
  @Field()
  roomId: string;
}
