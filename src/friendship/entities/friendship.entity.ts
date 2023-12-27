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
import { User } from 'src/user/entities/user.entity';
import { FrienshipRequestEnum } from 'src/utils/enums/FrienshipRequest.enum';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Table
export class FriendShip extends Model {
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
  senderId: string;

  @ForeignKey(() => User)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  receiverId: string;

  @Field()
  @Column({
    type: DataType.ENUM(...Object.values(FrienshipRequestEnum)),
    defaultValue: FrienshipRequestEnum.PENDING,
  })
  accepted: FrienshipRequestEnum;

  @BelongsTo(() => User, 'senderId')
  @Field(() => User, { nullable: true })
  userSender: User;

  @BelongsTo(() => User, 'receiverId')
  @Field(() => User, { nullable: true })
  userReceiver: User;

  @BeforeCreate
  static generateUUID(instance: User) {
    instance.id = uuid();
  }
}
