import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NotificationInput {
  @Field()
  title: string;

  @Field()
  body: string;
}
