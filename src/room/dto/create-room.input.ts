import { InputType, Field } from '@nestjs/graphql';
import { Column, DataType } from 'sequelize-typescript';

@InputType()
export class CreateRoomInput {
  @Field()
  @Column({
    type: DataType.UUID,
  })
  receiver: string;
}
