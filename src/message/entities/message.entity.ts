import { ObjectType, Field } from '@nestjs/graphql';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Table
export class Message extends Model {
  @PrimaryKey
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

  @BeforeCreate
  static generateUUID(instance: User) {
    instance.id = uuid();
  }
}
