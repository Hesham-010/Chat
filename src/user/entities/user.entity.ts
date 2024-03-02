import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { FriendShip } from 'src/friendship/entities/friendship.entity';
import { Message } from 'src/message/entities/message.entity';
import { Room } from 'src/room/entities/room.entity';
import { GenderEnum, UserRoleEnum } from '../user.enum';
import { DataTypes } from 'sequelize';
import { paginate } from 'src/_common/pagination/paginate';
import { Fcm_Token } from 'src/notification/models/fcm_token.model';
import { Verify } from 'src/auth/entities/verify.entity';

@ObjectType()
@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Field(() => ID)
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @AllowNull(false)
  @Field()
  @Column
  firstName: string;

  @AllowNull(false)
  @Field()
  @Column
  lastName: string;

  @AllowNull(false)
  @Field()
  @Column
  fullName: string;

  @AllowNull(true)
  @Column
  @Field({ nullable: true })
  bio?: string;

  @AllowNull(false)
  @Column
  @Field()
  phone: string;

  @AllowNull(true)
  @Field({ nullable: true })
  @Column({
    unique: true,
  })
  verifiedEmail?: string;

  @AllowNull(true)
  @Field({ nullable: true })
  @Column({
    unique: true,
  })
  notVerifiedEmail?: string;

  @AllowNull(false)
  @Column
  password: string;

  @Default(GenderEnum.MALE)
  @AllowNull(false)
  @Column({ type: DataTypes.ENUM, values: Object.values(GenderEnum) })
  @Field()
  gender: GenderEnum;

  @Default(UserRoleEnum.USER)
  @AllowNull(false)
  @Column({ type: DataTypes.ENUM, values: Object.values(UserRoleEnum) })
  @Field()
  role: UserRoleEnum;

  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  @Field({ nullable: true })
  profilePicture?: string;

  @Default(false)
  @AllowNull(false)
  @Column
  @Field()
  isBlocked: boolean;

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => FriendShip)
  friendship: FriendShip[];

  @HasMany(() => Room)
  room: Room[];

  @HasMany(() => Verify)
  verify: Verify[];

  @HasMany(() => Fcm_Token)
  fcm_Token: Fcm_Token[];

  static async paginate(
    filter = {},
    sort = '-createdAt',
    page = 0,
    limit = 15,
    include: any = [],
  ) {
    return paginate<User>(this, filter, sort, page, limit, include);
  }
}
