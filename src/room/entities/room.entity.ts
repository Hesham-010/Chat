import { ObjectType, Field } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table({
  tableName: 'rooms',
})
export class Room extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @ForeignKey(() => User)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  senderId: string;

  @ForeignKey(() => User)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  receiverId: string;

  @BelongsTo(() => User, 'senderId')
  sender: User;

  @BelongsTo(() => User, 'receiverId')
  receiver: User;

  @HasMany(() => Message)
  messages: Message[];
}
