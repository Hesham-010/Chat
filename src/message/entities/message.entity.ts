import { ObjectType, Field } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table({
  tableName: 'messages',
})
export class Message extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Field(() => String)
  @Column
  content: string;

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

  @ForeignKey(() => Room)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  roomId: string;

  @BelongsTo(() => Room)
  room: Room;

  @BelongsTo(() => User, 'senderId')
  userSender: User;

  @BelongsTo(() => User, 'receiverId')
  userReceiver: User;
}
