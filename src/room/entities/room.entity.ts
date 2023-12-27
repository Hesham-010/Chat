import { ObjectType, Field } from '@nestjs/graphql';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Table
export class Room extends Model {
  @PrimaryKey
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
  user1Id: string;

  @ForeignKey(() => User)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  user2Id: string;

  @BelongsTo(() => User, 'user1Id')
  user1: User;

  @BelongsTo(() => User, 'user2Id')
  user2: User;

  @HasMany(() => Message)
  messages: Message[];

  @BeforeCreate
  static generateUUID(instance: User) {
    instance.id = uuid();
  }
}
