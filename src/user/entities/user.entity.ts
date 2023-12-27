import { ObjectType, Field } from '@nestjs/graphql';
import {
  BeforeCreate,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Social } from 'src/auth/entities/social.entity';
import { Verify } from 'src/auth/entities/verify.entity';
import { FriendShip } from 'src/friendship/entities/friendship.entity';
import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import { SocialEnum } from 'src/utils/enums/social.enum';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Table
export class User extends Model {
  @PrimaryKey
  @Field()
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Field()
  @Column
  firstName: string;

  @Field()
  @Column
  lastName: string;

  @Field()
  @Column({
    unique: true,
  })
  verifiedEmail: string;

  @Field()
  @Column({
    unique: true,
  })
  unVerifiedEmail: string;

  @Column
  password: string;

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => Social)
  social: Social[];

  @HasMany(() => FriendShip)
  friendship: FriendShip[];

  @HasMany(() => Room)
  room: Room[];

  @BeforeCreate
  static autoGenerateUUID(user: User) {
    user.id = uuid();
  }
}
